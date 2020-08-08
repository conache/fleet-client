import {updateProgress} from '../../ducks/uploads'
import * as UploadsAPI from '../../api/uploads'
import store from '../../store'
import LimitedQueue from "./LimitedQueue"
import ChunkUploader from './ChunkUploader';

class FileUploadService {
    constructor() {
        this._chunksUploadersCount = 5;
        this._chunkSize = 1000 // 1 kb 
        this._chunksQueue = new LimitedQueue(1024);
        this._chunksUploaders = Array(this._chunksUploadersCount).fill().map((_, index) => new ChunkUploader(this._chunksQueue, index));
    }

    async startFileUpload(fileObject) {
        UploadsAPI.createUpload().then(() => 
            this._addFileToChunksQueue(fileObject)
        );
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