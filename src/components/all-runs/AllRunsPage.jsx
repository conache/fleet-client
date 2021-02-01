import React from 'react'
import { pathOr } from 'ramda'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux"
import { listTestRuns } from "../../reducers/testRuns.reducer";
import RunCard from '../test-run/RunCard';
import Immutable from 'seamless-immutable';
import NoRuns from './NoRuns';
import moment from 'moment';

const RunsBatchTitle = (props) => {
  return <div className="runs-batch-title">
    <div className="label">{props.label}</div>
    <div className="line" />
  </div>
} 

class AllRunsPage extends React.Component {
  componentDidMount() {
    this.props.listTestRuns();
  }

  render() {
    const { testRuns, testRunsLoading, testRunCreating, onActionButtonClick } = this.props;

    if (testRuns?.length === 0 && !testRunsLoading && !testRunCreating) {
      return <NoRuns onButtonClick={onActionButtonClick}/>
    }

    let latestRuns = [];
    let olderRuns = [];

    testRuns.forEach(run => {
      if (moment().diff(moment(run.CreatedAt), 'hours') <= 6) {
        latestRuns.push(run);
      } else {
        olderRuns.push(run);
      }
    });
    const displayRunsInBatches = latestRuns.length > 0 && olderRuns.length > 0
    return [
      displayRunsInBatches ? <RunsBatchTitle label="Latest runs" />: null,
      this.getRunsCards(latestRuns),
      displayRunsInBatches ? <RunsBatchTitle label="Older runs" /> : null,
      this.getRunsCards(olderRuns)
    ]
  }

  getRunsCards(runsList = []) {
    return runsList.map((testRun, index) => <RunCard key={index} testRun={testRun} clickable={true} className="run-card" />);
  }
}

function mapStateToProps(state) {
  return {
    testRunsLoading: pathOr(false, ["testRuns", "isListLoading"], state),
    testRunCreating: pathOr(0, ["testRuns", "isCreating"], state),
    testRuns: Immutable.asMutable(pathOr([], ["testRuns", "items"], state)).sort((a, b) => {
      return new Date(b.CreatedAt) - new Date(a.CreatedAt);
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listTestRuns }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRunsPage)