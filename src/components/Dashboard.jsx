import React from 'react';
import { Route, Redirect, Switch, withRouter} from "react-router-dom";
import { withUser } from "../context/user";
import AllRunsPage from "./all-runs/AllRunsPage";
import RunPage from './run/RunPage';
import TopNav from "./nav/TopNav";
import SideNav from "./nav/SideNav";
import GeneralModal from "./shared/GeneralModal";
import NewRunTemplate from './shared/NewRunTemplate';
import { Grid } from '@material-ui/core';
import LoadingSpinner from './shared/LoadingSpinner';
import { connect} from "react-redux";
import { pathOr } from 'rambda';


class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      displayNewRunModal: false,
    }
  }

  render() {
    const { match, currentUser, testRunsLoading, testRunCreating, history } = this.props;
    const { displayNewRunModal } = this.state;
    const closeModalFct = () => this.setState({ displayNewRunModal: false });

    return [
      <Grid container direction="row" className="dashboard-container">
        <Grid item xs={2}>
          <SideNav user={currentUser} />
        </Grid>
        <Grid item xs={10} className="dashboard-section">
          <TopNav onNewRunClick={() => this.setState({ displayNewRunModal: true })} />
          <Grid container className="dashboard-content">
            {testRunsLoading || (testRunCreating > 0) ? <LoadingSpinner /> : null }
            <Switch >
              <Route key="run-page" exact path={`/runs/:id`} render={(props) => <RunPage runId={props.match.params.id} />} />
              <Route key="all-runs-page" exact path={`${match.path}/`} render={() => {
                return <AllRunsPage onActionButtonClick={() => this.setState({displayNewRunModal: true})} />
              }}/>
              <Redirect to={{ pathname: "/" }} />
            </Switch>
          </Grid>
        </Grid>
        <GeneralModal title="Create new run" name="new-run" showModal={displayNewRunModal} closeModalFct={closeModalFct} >
          <NewRunTemplate onCancel={closeModalFct} onConfirm={() => {
            closeModalFct();
            history.push("/all-runs-page");
          }} />
        </GeneralModal>
      </Grid>
    ]
  }
}

function mapStateToProps(state) {
  return {
    testRunsLoading: pathOr(false, ["testRuns", "isListLoading"], state),
    testRunCreating: pathOr(0, ["testRuns", "isCreating"], state),
  };
}

export default connect(mapStateToProps, null)(withUser(withRouter(Dashboard)));