import * as UploadsAPI from '../../api/uploads'
import LimitedQueue from "./LimitedQueue"
import ChunkUploader from './ChunkUploader';

class FileUploadService {    
    constructor() {
        this._chunksUploadersCount = 6;
        this._chunkSize = 1000 * 1000 * 1// 1 mb     
        this._chunksQueue = new LimitedQueue(1024);
        this._chunksUploaders = Array(this._chunksUploadersCount).fill().map((_, index) => new ChunkUploader(this._chunksQueue, index));
    }

    async startFileUpload(fileObject) {
        UploadsAPI.createUpload({
            name: fileObject.name,
            size: fileObject.size,
            maxChunkSize: this._chunkSize,
        }).then(({file}) => {
            this._addFileToChunksQueue(file.id, fileObject);
        });
    }

    _addFileToChunksQueue(fileId, fileObject) {
        const totalChunksCount = Math.ceil(fileObject.size / this._chunkSize);  
        return new Promise((resolve, reject) => {
            const addChunkToQueue = (chunkIndex = 0) => {
                if (chunkIndex === totalChunksCount) {
                    resolve();
                    return;
                }
    
                this._chunksQueue.onSpaceAvailable(async () => {
                    const chunkStartIndex = chunkIndex * this._chunkSize;
                    const chunk = fileObject.slice(chunkStartIndex, chunkStartIndex + this._chunkSize);
                    const chunkDataObject = {
                        index: chunkIndex,
                        fileId: fileId,
                        data: await this.formatChunk(chunk)
                    };

                    this._chunksQueue.enqueue(chunkDataObject);
                    addChunkToQueue(++chunkIndex);
                });
            };

            // start the recursive function
            addChunkToQueue();
        });
    }

    async formatChunk(chunk) {
        return Array.from(new Uint8Array(await chunk.arrayBuffer()))
    }
}

export default new FileUploadService();