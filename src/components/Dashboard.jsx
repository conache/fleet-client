import React from 'react';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { withUser } from "../context/user";
import AllRunsPage from "./all-runs/AllRunsPage";
import RunPage from './run/RunPage';
import TopNav from "./nav/TopNav";
import SideNav from "./nav/SideNav";
import GeneralModal from "./shared/GeneralModal";
import NewRunTemplate from './shared/NewRunTemplate';
import { Grid } from '@material-ui/core';
import LoadingSpinner from './shared/LoadingSpinner';
import { connect } from "react-redux";
import { pathOr } from 'rambda';
import { RUN_STATES } from '../constants';
import { forceStopTestRun } from '../api/testRun';
import {ConfrimationPopup} from "./shared/ConfirmationPopup";
import { bindActionCreators } from 'redux';
import { logout } from "../reducers/user.reducer";
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';


class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      displayNewRunModal: false,
      displayLogoutModal: false,
    }
  }

  getPendingTestRuns() {
    return this.props.testRuns.filter(testRun => {
      return Object.values(RUN_STATES).indexOf(testRun.state) < Object.values(RUN_STATES).indexOf(RUN_STATES.FILE_UPLOAD_DONE);
    })
  }

  forceStopPendingRuns() {
    this.getPendingTestRuns().forEach(async testRun => {
      forceStopTestRun(testRun.id);
    });
  }

  componentDidMount() {
    window.onbeforeunload = (e) => {
      e.preventDefault();
      if (this.getPendingTestRuns().length > 0) {
        e.returnValue = 'Some of your test runs will be affected by this action. Are you sure you want to leave?';
        return true;
      }
    }
    window.onunload = () => this.forceStopPendingRuns()
  }

  render() {
    const { match, currentUser, testRunsLoading, testRunCreating, history } = this.props;
    const { displayNewRunModal, displayLogoutModal } = this.state;
    const closeModalFct = () => this.setState({ displayNewRunModal: false });

    return [
      <Grid container direction="row" className="dashboard-container">
        <Grid item xs={2}>
          <SideNav user={currentUser} onLogoutClick={() => this.handleLogoutClick()}/>
        </Grid>
        <Grid item xs={10} className="dashboard-section">
          <TopNav onNewRunClick={() => this.setState({ displayNewRunModal: true })} />
          <Grid container className="dashboard-content">
            {testRunsLoading || (testRunCreating > 0) ? <LoadingSpinner /> : null}
            <div className="content-container">
              <Switch >
                <Route key="run-page" exact path={`/runs/:id`} render={(props) => <RunPage runId={props.match.params.id} />} />
                <Route key="all-runs-page" exact path={`${match.path}/`} render={() => {
                  return <AllRunsPage onActionButtonClick={() => this.setState({ displayNewRunModal: true })} />
                }} />
                <Redirect to={{ pathname: "/" }} />
              </Switch>
            </div>
          </Grid>
        </Grid>
        {/* Modals */}
        <GeneralModal title="Create new run" name="new-run" showModal={displayNewRunModal} closeModalFct={closeModalFct} >
          <NewRunTemplate onCancel={closeModalFct} onConfirm={() => {
            closeModalFct();
            history.push("/all-runs-page");
          }} />
        </GeneralModal>
        <GeneralModal title="Are you sure you want to logout?" name="logout-modal" showModal={displayLogoutModal}
          closeModalFct={() => this.setState({displayLogoutModal: false})} >
          <ConfrimationPopup 
            icon={<ReportProblemRoundedIcon className="logout-warning-icon"/>}
            text={"Some of your pending test runs that will be affected by this action."}
            btnLabel={"logout"}
            onBtnClick={() => {
              this.forceStopPendingRuns();
              this.props.logout()}
            }
          />
        </GeneralModal>
      </Grid>
    ]
  }

  handleLogoutClick() {
    if (this.getPendingTestRuns().length > 0) {
      this.setState({displayLogoutModal: true})
      return;
    }
    this.props.logout();
  }
}

function mapStateToProps(state) {
  return {
    testRunsLoading: pathOr(false, ["testRuns", "isListLoading"], state),
    testRunCreating: pathOr(0, ["testRuns", "isCreating"], state),
    testRuns: pathOr([], ["testRuns", "items"], state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withUser(withRouter(Dashboard)));