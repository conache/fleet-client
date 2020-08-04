import * as UploadsAPI from '../api/uploads'
import store from '../store'
import {updateProgress} from '../ducks/uploads'
import {EventTarget} from 'event-target-shim'

const LimitedQueueEvents = {
    SPACE_AVAILABLE: "spaceAvailable",
    VALUE_AVAILABLE: "valueAvailable",
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
        this._eventTarget.dispatchEvent(new Event(LimitedQueueEvents.VALUE_AVAILABLE));
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

    onValueAvailable(callback) {
        if (this._elements.length > 0) {
            callback(this.dequeue());
            return;
        }

        this.on(LimitedQueueEvents.VALUE_AVAILABLE, callback);
    }

    on(eventType, callback) {
        this._eventTarget.addEventListener(eventType, callback);
    }

    toString() {
        return this._elements.toString();
    }
}

class ChunkUploader {
    constructor(chunksQueue) {
        this._chunksQueue = chunksQueue;
        setTimeout(this._start(), 0);
    }

    _start() {
        this._chunksQueue.onValueAvailable(async () => {
            const chunk = this._chunksQueue.dequeue();
            if (chunk) {
                await this._uploadChunk(chunk);
            }
        });
    }

    async _uploadChunk(chunk) {
        const formattedChunk = await this._formatChunk(chunk);
        UploadsAPI.sendFileChunk(formattedChunk).then(res => {
            console.log("Successfully uploaded chunk:", formattedChunk);
        }, err => {
            console.log("Chunk upload error");
        });
    }
    
    async _formatChunk(chunk) {
        const chunkBytes = new Uint8Array(await chunk.arrayBuffer())
        return JSON.parse(JSON.stringify(chunkBytes, function (_, v) {
            if (v instanceof Uint8Array) {
                return Array.apply([], v);
            }
            return v;
        }));
    }
}

class FileUploadService {
    constructor() {
        this._chunksUploadersCount = 5;
        this._chunkSize = 1024 // 1MB
        this._chunksQueue = new LimitedQueue(1024);
        this._chunksUploaders = Array(this._chunksUploadersCount).fill().map(() => new ChunkUploader(this._chunksQueue));
    }

    async startFileUpload(fileObject) {
        UploadsAPI.createUpload().then(() => this._addFileToChunksQueue(fileObject));
    }

    _addFileToChunksQueue(fileObject) {
        const totalChunksCount = Math.ceil(fileObject.size / this._chunkSize);        

        return new Promise((resolve, reject) => {
            const addChunkToQueue = (chunkIndex = 0) => {
                if (chunkIndex === totalChunksCount) {
                    resolve();
                    return;
                }
    
                this._chunksQueue.onSpaceAvailable(() => {
                    const chunkStart = chunkIndex * this._chunkSize;
                    console.log("Added chunk:", chunkIndex);
                    this._chunksQueue.enqueue(fileObject.slice(chunkStart, chunkStart + this._chunkSize))
                    addChunkToQueue(++chunkIndex);
                });
            };

            // start the recursive function
            addChunkToQueue();
        });
    }

    testDispatch() {
        store.dispatch(updateProgress(12));
    }
}

export default new FileUploadService();