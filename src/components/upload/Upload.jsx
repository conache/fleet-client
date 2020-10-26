import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pathOr } from 'rambda';

import FileInput from '../shared/FileInput';
import FileUploadService from '../../services/file-upload-service/FileUploadService';
import SocketService from "../../services/socket-service/SocketService";

class Upload extends Component {
    constructor() {
        super();
        SocketService.connectToServer()
    }

    render() {
        const { progress } = this.props;
        return <div>
            <div>{progress}</div>
            <FileInput onSubmit={(file) => this.handleFileSubmit(file)} />
        </div>
    }

    handleFileSubmit(file) {
        FileUploadService.startFileUpload(file);
    }
}

function mapStateToProps(state) {
    return {
        progress: pathOr(0, ['uploads', 'progress'], state),
    };
}

export default connect(mapStateToProps, null)(Upload);