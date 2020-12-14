import React from 'react';
import {pathOr} from 'rambda';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux"
import { getTestRun } from '../../reducers/testRuns.reducer';


class RunPage extends React.Component {
  componentDidMount() {
    this.props.getTestRun(this.props.runId);
  }

  render() {
    const {testRun, file} = this.props;
    if (!testRun) {
      return <div>loading</div>
    }
    return <React.Fragment>
      <div className="header-section">
        {JSON.stringify(file || {})}
        <div>-------------------------------------</div>
        {JSON.stringify(testRun)}
      </div>
      <div className="content-section">
        {JSON.stringify(testRun.runIssues)}
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state, ownProps) {
  const {runId} = ownProps;
  const testRun = pathOr([], ["testRuns"], state).find(testRun => testRun.id === parseInt(runId));
  return {
    testRun: testRun,
    file: pathOr([], ["files"], state).find(file => file.id === testRun.fileId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getTestRun}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RunPage)
