import React, { Component } from 'react';
import FileInput from '../shared/FileInput';
import FileUploader from '../../services/FileUploader';

class Upload extends Component {
    render() {
        return <FileInput onSubmit={(file) => this.handleFileSubmit(file)} />
    }

    handleFileSubmit(file) {
        const fileUploader = new FileUploader(file);
        fileUploader.startUpload();
    }
}
  
export default Upload;