import * as UploadsAPI from '../api/uploads'
import store from '../store'
import {updateProgress} from '../ducks/uploads'
import {EventTarget} from 'event-target-shim'
import { call } from 'ramda';

const LimitedQueueEvents = {
    SPACE_AVAILABLE: "spaceAvailable",
};

class LimitedQueue {

    constructor(size=100) {
        this._elements = [];
        this._size = size;
        this._eventTarget = new EventTarget();
    }

    get size() {
        return this._size;
    }

    get availableSpace() {
        return this.size - this._elements.length;
    }

    enqueue(element) {
        if (this._elements.length === this.size) {
            return false;
        }

        this._elements.push(element);
        return true;
    }

    dequeue() {
        const element = this._elements.shift();
        this._eventTarget.dispatchEvent(new Event(LimitedQueueEvents.SPACE_AVAILABLE));
        return element;
    }

    isEmpty() {
        return this._elements.length > 0;
    }
    
    onSpaceAvailable(callback) {
        if (this.availableSpace > 0) {
            callback();
            return;
        }
        this.on(LimitedQueueEvents.SPACE_AVAILABLE, callback);
    }

    on(eventType, callback) {
        this._eventTarget.addEventListener(eventType, callback);
    }

    toString() {
        return this._elements.toString();
    }
}

class FileUploader {
    constructor() {
        this._chunkSize = 1024 // 1mb
        this._chunksQueue = new LimitedQueue(2);
    }

    uploadFile(fileObject) {
        const fileChunker = new Promise((resolve, reject) => {
            const totalChunksCount = Math.ceil(fileObject.size / this._chunkSize);
            console.log("Total chunks count:", totalChunksCount);
            let currentChunk = 0;
            do {
                const start = currentChunk * this._chunkSize;
                this._chunksQueue.onSpaceAvailable(() => {
                    console.log("Add chunk ", currentChunk);
                    this._chunksQueue.enqueue(fileObject.slice(start, start + this._chunkSize))
                });
                currentChunk += 1;
            } while (currentChunk < totalChunksCount); 
            this._chunksQueue.dequeue();
            resolve();
        });
        
        fileChunker.then(() => {
            console.log("File successfully added to queue:");
            console.log(this._chunksQueue);
        });
    }

    startUpload() {
        UploadsAPI.createUpload();
        const blob = this.file.slice(0, 100);
        blob.arrayBuffer().then(buff => {
            const bytesArray = new Uint8Array(buff);
            const jsonArray = JSON.parse(JSON.stringify(bytesArray, function (k, v) {
                if (v instanceof Uint8Array) {
                    return Array.apply([], v);
                }
                return v;
            }));
            UploadsAPI.sendFileChunk(jsonArray);
        });
    }

    testDispatch() {
        store.dispatch(updateProgress(12));
    }
}

export default new FileUploader();