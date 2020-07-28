import * as UploadsAPI from '../api/uploads'

class FileUploader {
    constructor(file) {
        this.file = file;
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
}

export default FileUploader;