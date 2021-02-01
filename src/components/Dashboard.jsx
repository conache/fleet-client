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
import {showModal, hideAllModals, hideModal} from "../reducers/ui.reducer";
import { createTestRun } from "../reducers/testRuns.reducer";
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';

const MODAL = {
  NEW_RUN: "NEW_RUN",
  LOGOUT: "LOGOUT",
  OFFLINE: "OFFLINE",
}

class Dashboard extends React.Component {
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
    window.addEventListener("online", () => this.props.hideModal(MODAL.OFFLINE));
    window.addEventListener("offline", () => {
      if (this.getPendingTestRuns().length) {
        this.props.hideAllModals();
        this.props.showModal(MODAL.OFFLINE);
      }
    });

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
    const { match, currentUser, testRuns, testRunsLoading, testRunCreating, activeModal, creatingTestRun  } = this.props;

    return [
      <TopNav onNewRunClick={() => this.props.showModal(MODAL.NEW_RUN)} testRunsCount={testRuns.length}/>,
      <Grid container direction="row" className="dashboard-container">
        <Grid item xs={2}>
          <SideNav user={currentUser} onLogoutClick={() => this.handleLogoutClick()}/>
        </Grid>
        <Grid item xs={10} className="dashboard-section">
          
          <Grid container className="dashboard-content">
            {testRunsLoading || (testRunCreating > 0) ? <LoadingSpinner /> : null}
            <div className="content-container">
              <Switch >
                <Route key="run-page" exact path={`/runs/:id`} render={(props) => <RunPage runId={props.match.params.id} />} />
                <Route key="all-runs-page" exact path={`${match.path}/`} render={() => {
                  return <AllRunsPage onActionButtonClick={() => this.props.showModal(MODAL.NEW_RUN)} />
                }} />
                <Redirect to={{ pathname: "/" }} />
              </Switch>
            </div>
          </Grid>
        </Grid>
        
        
        {/* Modals */}


        <GeneralModal title="Create new run" name="new-run" showModal={MODAL.NEW_RUN === activeModal}
                      disableEscapeKeyDown={true}
                      disableBackdropClick={true}
                      closeModalFct={() => !creatingTestRun && this.props.hideModal(MODAL.NEW_RUN)} >
          <NewRunTemplate onCancel={() => !creatingTestRun && this.props.hideModal(MODAL.NEW_RUN)}
            onConfirm={(name, file) => this.handleTestRunCreateConfirmation(name, file)} />
        </GeneralModal>

        <GeneralModal title="Are you sure you want to logout?" name="logout-modal"
                      showModal={MODAL.LOGOUT === activeModal}
          closeModalFct={() => this.props.hideModal(MODAL.LOGOUT)} >
          <ConfrimationPopup 
            icon={<ReportProblemRoundedIcon className="logout-warning-icon"/>}
            text={"Some of your pending test runs will be affected by this action."}
            btnLabel={"logout"}
            onBtnClick={() => {
              this.forceStopPendingRuns();
              this.props.hideModal(MODAL.LOGOUT)
              this.props.logout()}
            }
          />
        </GeneralModal>

        <GeneralModal title="Internet connectivity issues" name="connection-issues-modal"
          showModal={MODAL.OFFLINE === activeModal}
          className="confirmation-popup-modal"
          closeModalFct={() => this.props.hideModal(MODAL.OFFLINE)}>
          <ConfrimationPopup
            icon={<SignalWifiOffIcon className="connection-issues-icon"/>}
            text={`Your pending test runs will continue after reconnecting to the internet.
            In order not to affect your evaluations, do not close or refresh the current window.
            `}
            btnLabel={"OK"}
            onBtnClick={() => this.props.hideModal(MODAL.OFFLINE)}
          />
        </GeneralModal>

      </Grid>
    ]
  }

  
  handleTestRunCreateConfirmation(runName, file) {
    this.props.createTestRun(
      {
        name: runName,
      }, {
      name: file.name,
      size: file.size,
      maxChunkSize: 1000 * 1000 * 1 // 1mb 
    },
      file
    );
  }

  handleLogoutClick() {
    if (this.getPendingTestRuns().length > 0) {
      this.props.showModal(MODAL.LOGOUT);
      return;
    }
    this.props.logout();
  }
}

function mapStateToProps(state) {
  return {
    testRunsLoading: pathOr(false, ["testRuns", "isListLoading"], state),
    creatingTestRun: pathOr(false, ["testRuns", "creating"], state),
    testRuns: pathOr([], ["testRuns", "items"], state),
    activeModal: pathOr([], ["ui", "activeModal"], state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, showModal, hideAllModals, hideModal, createTestRun}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withUser(withRouter(Dashboard)));