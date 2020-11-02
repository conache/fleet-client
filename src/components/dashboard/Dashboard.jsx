import React from 'react';
import {Route, Switch} from "react-router-dom";
import Upload from "../upload/Upload";

const Dashboard = (props) => {
  const {match} = props;

  return <Switch>
    <Route exact path={`${match.path}`} component={Upload} />
  </Switch>
}

export default Dashboard;