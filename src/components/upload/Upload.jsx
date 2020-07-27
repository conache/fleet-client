import React, { Component } from 'react';
import FileInput from '../shared/FileInput';
import FileUploader from '../../services/FileUploader';

class Upload extends Component {
    constructor() {
        super();
        
        this.fileUploader = new FileUploader();
    }

    render() {
        return <FileInput onSubmit={(filePath) => {console.log(filePath);}} />
    }
}

export default Upload;