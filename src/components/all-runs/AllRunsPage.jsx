import React from 'react'
import { pathOr } from 'ramda'
import { bindActionCreators } from 'redux';
import {connect} from "react-redux"
import {listTestRuns} from "../../reducers/testRuns.reducer";
import Upload from "../upload/Upload";
import TestRunCard from '../test-run/TestRunCard';

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
    testRuns: pathOr([], ["testRuns"], state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({listTestRuns}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRunsPage)