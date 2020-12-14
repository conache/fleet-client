import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import ProgressBar from "./ProgressBar";
import { RUN_STATES } from '../../constants';
import { withRouter } from 'react-router-dom';

function hasClickableCard(testRun) {
  if (!testRun) {
    return false;
  }

  if (testRun.state === RUN_STATES.FINISHED) {
    return true;
  }

  return false;
}

const TestRunCard = (props) => {
  const { history, testRun } = props;

  return (
    <Card className={"card-element " + (hasClickableCard(testRun) ? "clickable" : "")}
      onClick={() => hasClickableCard(testRun) && history.push(`runs/${testRun.id}`)} >
      <CardHeader title={"test"} />
      <CardContent>
        <div>{hasClickableCard(testRun)}</div>
        <ProgressBar className="progress-bar" currentState={testRun.state} lastValidState={testRun.stateMetadata?.lastValidState} />
      </CardContent>
    </Card>
  );
};


export default withRouter(TestRunCard);