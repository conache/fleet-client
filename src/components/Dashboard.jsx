import React from 'react';
import {Route, Switch} from "react-router-dom";
import {withUser} from "../context/user";
import AllRunsPage from "./all-runs/AllRunsPage";
import RunPage from './run/RunPage';
import TopNav from "./nav/TopNav";
import SideNav from "./nav/SideNav";


class Dashboard extends React.Component {
  render() {
    const {match, currentUser} = this.props;
    
    return <div className="dashboard-container">
      <SideNav user={currentUser}/>
      <div className="dashboard-container-content">
        <TopNav />
        <div className="dashboard-content">
          <Switch >
            <Route exact path={`/runs/:id`} render={(props) => (
              <RunPage runId={props.match.params.id} />
            )} />
            <Route exact path={`${match.path}/`} component={AllRunsPage} />
            <Route render={() => {
              return <div>No route was matched</div>
            }} />
          </Switch>
        </div>
      </div>
  </div>
  }
}

export default withUser(Dashboard);