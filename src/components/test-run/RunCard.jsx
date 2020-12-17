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


class RunDuration extends React.Component {
  constructor(...args) {
    super(...args);
    this.timer = null;
  }
  
  componentDidUpdate(prevProps) {
    if (this.runHasFinishedAtTimestamp(this.props.run)) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    if (!this.runHasFinishedAtTimestamp(this.props.run)) {
      this.timer = setInterval(() => this.forceUpdate(), 1000);
    }
  }

  runHasFinishedAtTimestamp(run) {
    return moment(run.FinishedAt).unix() !== 0;
  }
  
  getRunDurationLabel(run) {
    const creationDate = moment(run.CreatedAt);
    const finishedDate = this.runHasFinishedAtTimestamp(run) ? moment(run.FinishedAt) : moment.now();
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
  
    if (duration.seconds() || label.length) {
      label += `${duration.seconds()}s`;
    }
  
    return label
  }

  render() {
    const {run} = this.props;

    return <div>{this.getRunDurationLabel(run)}</div>
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

function getRunCreationLabel(run) {
  const creationDate = moment(run.CreatedAt);

  if (creationDate.diff(moment.now(), 'days') > 2) {
    return creationDate.format("MM-DD-YYYY");
  }
  return creationDate.fromNow()
}

function getRunIssuesLabel(run) {
  if (run.runIssuesCount) {
    return `${run.runIssuesCount} issues`;
  }

  return "no issues found";
}

function getRunCardWidgets(run) {
  return [
    <RunCardWidget title="Started" IconClass={EventIcon}>
    <div>{getRunCreationLabel(run)}</div>
    </RunCardWidget>,
    <RunCardWidget title="Duration" IconClass={TimerIcon}>
      <RunDuration run={run} />
    </RunCardWidget>,
    <RunCardWidget title="Issues found" IconClass={BugReportIcon}>
      <div>{getRunIssuesLabel(run)}</div>
    </RunCardWidget>
  ]
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
          {getRunCardWidgets(testRun)}
        </div>
        <div className="run-meta bottom">
          {getRunCardWidgets(testRun)}
        </div>
      </CardContent>
    </Card>
  );
};


export default withRouter(RunCard);