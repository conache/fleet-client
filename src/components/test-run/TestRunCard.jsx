import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import ProgressBar from "./ProgressBar";

const TestRunCard = (props) => {
  const {testRun} = props;

  return (
    <Card className="card-element">
      <CardHeader title={"test"} />
      <CardContent>
      <ProgressBar className="progress-bar" currentState={testRun.state} lastValidState={testRun.stateMetadata?.lastValidState}/>
      </CardContent>
    </Card>
  );
};

export default TestRunCard;