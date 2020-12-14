import React from 'react'
import { pathOr } from 'ramda'
import { bindActionCreators } from 'redux';
import {connect} from "react-redux"
import {listTestRuns} from "../../reducers/testRuns.reducer";
import Upload from "../upload/Upload";
import TestRunCard from '../test-run/TestRunCard';
import Immutable from 'seamless-immutable';

class AllRunsPage extends React.Component {
  componentDidMount() {
    this.props.listTestRuns();
  }

  render() {
    const {testRuns} = this.props;

    return [
      testRuns.map(testRun => <TestRunCard testRun={testRun}/>),
      <Upload />,
    ]
  }
}

function mapStateToProps(state) {
  return {
    testRuns: Immutable.asMutable(pathOr([], ["testRuns"], state)).sort((a, b) => {
      return new Date(b.CreatedAt) - new Date(a.CreatedAt);
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({listTestRuns}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRunsPage)