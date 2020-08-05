import * as UploadsAPI from '../../api/uploads'
import {EventTarget} from 'event-target-shim'


export default class ChunkUploader {
    static events = {
        PAUSE_FINISH: "pauseFinish",
    };

    static states = {
        RUNNING: "running",
        PAUSED: "paused",
        UPLOADING: "uploading",    
    };

    constructor(chunksQueue) {
        this._chunksQueue = chunksQueue;
        this._status = navigator.onLine ? ChunkUploader.states.RUNNING : ChunkUploader.states.PAUSED;
        this._uploadRetriesCount = 5;
        this._eventTarget = new EventTarget();

        setTimeout(() => {
            this._initListeners();
            this._run();
        }, 0);
    }

    _initListeners() {
        const handleConnectionStatusUpdate = () => {
            this._status = navigator.onLine ? ChunkUploader.states.RUNNING : ChunkUploader.states.PAUSED;
            if (this._status !== ChunkUploader.states.PAUSED) {
                this._eventTarget.dispatchEvent(ChunkUploader.events.PAUSE_FINISH);
            }
        }

        window.addEventListener("online", handleConnectionStatusUpdate);
        window.addEventListener("offline", handleConnectionStatusUpdate);
    }

    _run() {
        console.log("Run chunk uploader");
        this._chunksQueue.onValueAvailable(async () => {
            debugger;
            if (this._status !== ChunkUploader.states.RUNNING) {
                return;
            }

            const chunk = this._chunksQueue.dequeue();
            if (chunk) {

                this._status = ChunkUploader.states.UPLOADING;
                await this._uploadChunk(chunk);
                this._status = ChunkUploader.states.RUNNING;
            }
            this._run();
        });
    }

    async _uploadChunk(chunk) {
        const formattedChunk = await this._formatChunk(chunk);
        return new Promise((resolve, reject) => {
            const sendChunkToServer = (remainingRetries = this._uploadRetriesCount) => {
                if (remainingRetries === 0) {
                    reject("Chunk upload fail");
                }
                
                if (this._status === ChunkUploader.states.PAUSED) {
                    this._onPauseFinish(() => sendChunkToServer(remainingRetries));
                }
    
                UploadsAPI.sendFileChunk(formattedChunk).then(res => {
                    console.log("Successfully uploaded chunk:", formattedChunk);
                    resolve();
                }, err => {
                    console.log("Chunk upload error");
                    sendChunkToServer(--remainingRetries);
                });
            }

            sendChunkToServer();
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

    _onPauseFinish(callback) {
        this._eventTarget.on(ChunkUploader.events.PAUSE_FINISH, callback);
    }
}