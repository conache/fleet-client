import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import '../style/Application.scss';
import { connect } from 'react-redux';
import { isAuthenticated } from "../session";
import LoginForm from './authentication/LoginForm';
import SignUpForm from './authentication/SignUpForm';
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from './common/PrivateRoute';
import LandingPage from './landing/LandingPage';


class Application extends Component {
  render() {
    const userIsAuthenticated = isAuthenticated();

    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/login"
            component={LoginForm} 
            hasPermission={!userIsAuthenticated}
          />
          <PrivateRoute exact path="/signup"
            component={SignUpForm}
            hasPermission={!userIsAuthenticated}
          />
          <PrivateRoute exact path="/landing"
            component={LandingPage}
            hasPermission={!userIsAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute exact path="/"
            component={Dashboard}
            hasPermission={userIsAuthenticated}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, null)(Application);
