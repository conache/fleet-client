import React from 'react';
import moment from 'moment';
import { Card, CardContent } from '@material-ui/core';
import ProgressBar from "./ProgressBar";
import { RUN_STATES } from '../../constants';
import { withRouter } from 'react-router-dom';
import RunCardWidget from './RunCardWidget';
import TimerIcon from '@material-ui/icons/Timer';
import EventIcon from '@material-ui/icons/Event';
import BugReportIcon from '@material-ui/icons/BugReport';


class RunCardWidgets extends React.Component {
  componentDidMount() {
    this.redrawInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.redrawInterval);
  }

  render() {
    const {run} = this.props;

    if (!run) {
      return null;
    }

    return [
      <RunCardWidget key="started" title="Started" IconClass={EventIcon}>
        <div>{this.getRunCreationLabel()}</div>
      </RunCardWidget>,
      <RunCardWidget key="duration" title="Duration" IconClass={TimerIcon}>
        <div>{this.getRunDurationLabel()}</div>
      </RunCardWidget>,
      <RunCardWidget keys="issues" title="Issues found" IconClass={BugReportIcon}>
        <div>{this.getRunIssuesLabel()}</div>
      </RunCardWidget>
    ];
  }

  getRunCreationLabel() {
    const { run } = this.props;
    const creationDate = moment(run.CreatedAt);

    if (creationDate.diff(moment.now(), 'days') > 2) {
      return creationDate.format("MM-DD-YYYY");
    }
    return creationDate.fromNow()
  }

  getRunIssuesLabel() {
    const { run } = this.props;
    if (run.runIssuesCount) {
      return `${run.runIssuesCount} issues`;
    }

    return "no issues found";
  }

  getRunDurationLabel() {
    const { run } = this.props;

    const creationDate = moment(run.CreatedAt);
    const finishedDate = this.runHasFinishedAtTimestamp(run) ? moment(run.FinishedAt) : moment();
    const duration = moment.duration(finishedDate.diff(creationDate));
    let label = "";

    if (duration.days()) {
      label += `${duration.days()}d `;
    }

    if (duration.hours() || label.length) {
      label += `${duration.hours()}h `;
    }

    if (duration.minutes() || label.length) {
      label += `${duration.minutes()}m `;
    }

    label += `${duration.seconds()}s`;

    return label
  }

  runHasFinishedAtTimestamp(run) {
    return moment(run.FinishedAt).unix() !== moment("0001-01-01T00:00:00Z").unix();
  }
}

function hasClickableCard(testRun) {
  if (!testRun) {
    return false;
  }

  if (testRun.state === RUN_STATES.FINISHED) {
    return true;
  }

  return false;
}


const RunCard = (props) => {
  const { history, testRun } = props;

  return (
    <Card className={"run-card " + (hasClickableCard(testRun) ? "clickable" : "")}
      onClick={() => hasClickableCard(testRun) && history.push(`runs/${testRun.id}`)} >
      <CardContent className="card-content">
        <div className="run-stats">
          <div className="card-title">{testRun.name}</div>
          <ProgressBar className="progress-bar" currentState={testRun.state} lastValidState={testRun.stateMetadata?.lastValidState} />
        </div>
        <div className="run-meta side">
          <RunCardWidgets key="side-widgets"run={testRun} />
        </div>
        <div className="run-meta bottom">
          <RunCardWidgets key="bottom-widgets" run={testRun} />
        </div>
      </CardContent>
    </Card>
  );
};


export default withRouter(RunCard);