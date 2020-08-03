import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pathOr } from 'rambda';
import FileInput from '../shared/FileInput';
import FileUploader from '../../services/FileUploader';

class Upload extends Component {
    render() {
        const { progress } = this.props;
        return <div>
            <div>{progress}</div>
            <FileInput onSubmit={(file) => this.handleFileSubmit(file)} />
        </div>
    }

    handleFileSubmit(file) {
        FileUploader.uploadFile(file);
        // fileUploader.testDispatch();
    }
}

function mapStateToProps(state) {
    return {
        progress: pathOr(0, ['uploads', 'progress'], state),
    };
}

export default connect(mapStateToProps, null)(Upload);