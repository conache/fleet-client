import React, { Component } from 'react';
import FileUploader from './FileUploader';

class Upload extends Component {
    constructor() {
        super();
        
        this.fileUploader = new FileUploader();
    }

    render() {
        return <div> This is a test component</div>
    }
}

export default Upload;