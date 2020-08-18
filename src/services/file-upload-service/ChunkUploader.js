import * as UploadsAPI from '../../api/uploads'
import {EventTarget} from 'event-target-shim'


export default class ChunkUploader {
    static events = {
        PAUSE_FINISH: "pauseFinish",
    };

    static states = {
        RUNNING: "running",
        PAUSED: "paused",
    };

    constructor(chunksQueue, index) {
        this._index = index;
        this._chunksQueue = chunksQueue;
        this._status = navigator.onLine ? ChunkUploader.states.RUNNING : ChunkUploader.states.PAUSED;
        this._uploadRetriesCount = 5;
        this._currentProcessingChunk = null;
        this._eventTarget = new EventTarget();

        
        queueMicrotask(() => {
            this._init();

            this._run();
        });
    }

    _init() {
        this._initListeners();
        // the uploader can be already paused if the internet is not working
        this._onPauseFinish(() => this._run());
    }

    _initListeners() {
        const handleConnectionStatusUpdate = () => {
            this._status = navigator.onLine ? ChunkUploader.states.RUNNING : ChunkUploader.states.PAUSED;
            if (this._status !== ChunkUploader.states.PAUSED) {
                this._eventTarget.dispatchEvent(new Event(ChunkUploader.events.PAUSE_FINISH));
            }
        }

        window.addEventListener("online", handleConnectionStatusUpdate);
        window.addEventListener("offline", handleConnectionStatusUpdate);
    }

    _run() {
        this._chunksQueue.onValueAvailable(async () => {
             if (this._currentProcessingChunk) {
                return;
            }

            this._currentProcessingChunk = this._chunksQueue.dequeue();            
            // the dequeue could return an undefined value
            if (this._currentProcessingChunk) {
                try {
                    await this._uploadChunk(this._currentProcessingChunk);
                    this._currentProcessingChunk = null;
                } catch(err) {
                    // TODO: solve this case
                    console.log("Chunk unprocessed:", err);
                    console.log("Should send info to server to force stop the current upload");
                }
            }
            // we need to queue this task in order to prevent the browser entering an infinite recusive call
            queueMicrotask(() => this._run());
        });
    }

    async _uploadChunk(chunk) {
        return new Promise((resolve, reject) => {
            const sendChunkToServer = (remainingRetries = this._uploadRetriesCount) => {
                if (remainingRetries === 0) {
                    reject("Chunk upload fail");
                    return;
                }
                
                if (this._status === ChunkUploader.states.PAUSED) {
                    this._onPauseFinish(() => sendChunkToServer(remainingRetries));
                    return;
                }
    
                UploadsAPI.sendFileChunk(chunk).then(res => {
                    resolve();
                }, err => {
                    sendChunkToServer(--remainingRetries);
                });
            }

            sendChunkToServer();
        });
    }

    _onPauseFinish(callback) {
        if (this._status !== ChunkUploader.states.PAUSED) {
            callback();
            return;
        }

        this._eventTarget.addEventListener(ChunkUploader.events.PAUSE_FINISH, callback);
    }
}