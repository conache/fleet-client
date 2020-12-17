import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { withUser } from "../context/user";
import AllRunsPage from "./all-runs/AllRunsPage";
import RunPage from './run/RunPage';
import TopNav from "./nav/TopNav";
import SideNav from "./nav/SideNav";
// import GeneralModal from "./shared/GeneralModal";
// import NewRunTemplate from './shared/NewRunTemplate';
import { Grid } from '@material-ui/core';

class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      displayNewRunModal: false,
    }
  }

  render() {
    const { match, currentUser } = this.props;
    const { displayNewRunModal } = this.state;

    return [
      <Grid container direction="row" className="dashboard-container">
        <Grid item xs={2}>
          <SideNav user={currentUser} />
        </Grid>
        <Grid item xs={10} direction="column" justify="flex-start" alignItems="center" className="dashboard-section">
          <TopNav onNewRunClick={() => this.setState({ displayNewRunModal: true })} />
          <Grid container md={12} lg={8} className="dashboard-content">
              <Switch >
                <Route exact path={`/runs/:id`} render={(props) => <RunPage runId={props.match.params.id} />} />
                <Route exact path={`${match.path}/`} component={AllRunsPage} />
                <Redirect to={{ pathname: "/" }} />
              </Switch>
          </Grid>
        </Grid>
        {/*
      <GeneralModal title="New run" name="new-run" showModal={displayNewRunModal} closeModalFct={() => this.setState({displayNewRunModal: false})}>
        <NewRunTemplate />
      </GeneralModal> */}

      </Grid>
    ]
  }
}

export default withUser(Dashboard);