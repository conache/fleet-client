import * as UploadsAPI from '../api/uploads'

class FileUploader {
    constructor(file) {
        this.file = file;
    }

    startUpload() {
        UploadsAPI.createUpload();
    }

}

export default FileUploader;