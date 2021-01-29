import React from 'react';
import moment from 'moment';
import { Card, CardContent } from '@material-ui/core';
import ProgressBar from "./ProgressBar";
import { RUN_STATES } from '../../constants';
import { formatBytes } from "../../utils";
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
    const { run } = this.props;

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
      run.state === RUN_STATES.FINISHED ? <RunCardWidget keys="issues" title="Issues found" IconClass={BugReportIcon}>
        <div>{this.getRunIssuesLabel()}</div>
      </RunCardWidget> : null
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

class RunCard extends React.Component {
  isClickable() {
    const { testRun, clickable } = this.props;
    if (!clickable) {
      return false;
    }

    if (!testRun) {
      return false;
    }

    if (testRun.state === RUN_STATES.FINISHED) {
      return true;
    }

    return false;
  }

  render() {
    const { history, testRun, testFile } = this.props;

    return (
      <Card className={"run-card " + (this.isClickable() ? "clickable" : "")}
        onClick={() => this.isClickable() && history.push(`runs/${testRun.id}`)} >
        <CardContent className="card-content">
          <div className="card-title">{testRun.name}</div>
          <div className="run-details">
            <div className="run-stats">
              <ProgressBar className="progress-bar" currentState={testRun.state} lastValidState={testRun.stateMetadata?.lastValidState} />
              {testFile ? <div className="file-details">
                <div className="details-section">
                  <div className="detail-label">Tested file name:</div>
                  <div className="detail-content">{testFile.name}</div>
                </div>
                <div className="details-section">
                  <div className="detail-label">File size:</div>
                  <div className="detail-content">{formatBytes(testFile.size)}</div>
                </div>
              </div> : null
              }
            </div>
            <div className="run-meta side">
              <RunCardWidgets key="side-widgets" run={testRun} />
            </div>
            <div className="run-meta bottom">
              <RunCardWidgets key="bottom-widgets" run={testRun} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(RunCard);