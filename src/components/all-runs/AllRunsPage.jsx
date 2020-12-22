import React from 'react'
import { pathOr } from 'ramda'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux"
import { listTestRuns } from "../../reducers/testRuns.reducer";
import RunCard from '../test-run/RunCard';
import Immutable from 'seamless-immutable';
import NoRuns from './NoRuns';

class AllRunsPage extends React.Component {
  componentDidMount() {
    this.props.listTestRuns();
  }

  render() {
    const { testRuns, testRunsLoading, testRunCreating, onActionButtonClick } = this.props;

    if (testRuns?.length === 0 && !testRunsLoading && !testRunCreating) {
      return <NoRuns onButtonClick={onActionButtonClick}/>
    }

    return testRuns.map((testRun, index) => <RunCard key={index} testRun={testRun} clickable={true} className="run-card" />);
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