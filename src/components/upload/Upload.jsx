import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pathOr } from 'rambda';
import { bindActionCreators } from 'redux';

import FileInput from '../shared/FileInput';
import {createTestRun} from "../../reducers/testRuns.reducer";

class Upload extends Component {
    render() {
        const { progress } = this.props;
        return <div>
            <div>{progress}</div>
            <FileInput onSubmit={(file) => this.handleFileSubmit(file)} />
        </div>
    }

    handleFileSubmit(file) {
        debugger;
        this.props.createTestRun(
            {
                name: "Test run name"
            }, 
            {
                name: file.name,
                size: file.size,
                maxChunkSize: 1000 * 1000 * 1 // 1 mb
            },
            file
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createTestRun }, dispatch)
}

function mapStateToProps(state) {
    return {
        progress: pathOr(0, ['uploads', 'progress'], state),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);