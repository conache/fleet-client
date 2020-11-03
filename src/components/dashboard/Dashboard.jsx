import React from 'react';
import {Route, Switch} from "react-router-dom";
import Upload from "../upload/Upload";
import {withUser} from "../../context/user";

const Dashboard = (props) => {
  const {match, currentUser} = props;

  return <React.Fragment>
    <div>{JSON.stringify(currentUser)}</div>
    <Switch>
      <Route exact path={`${match.path}`} component={Upload} />
    </Switch>
  </React.Fragment>
}

export default withUser(Dashboard);