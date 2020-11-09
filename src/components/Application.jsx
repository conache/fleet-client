import React, { Component } from 'react';
import {Router, Switch } from 'react-router-dom';
import '../style/Application.scss';
import { isAuthenticated } from "../session";
import LoginForm from './authentication/LoginForm';
import SignUpForm from './authentication/SignUpForm';
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from './common/PrivateRoute';
import LandingPage from './landing/LandingPage';
import { UserContext } from '../context/user';
import history from "../history";


class Application extends Component {
  render() {
    const {user} = this.props;
    const userIsAuthenticated = isAuthenticated();

    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/login"
            component={LoginForm} 
            hasPermission={!userIsAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute exact path="/signup"
            component={SignUpForm}
            hasPermission={!userIsAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute exact path="/landing"
            component={LandingPage}
            hasPermission={!userIsAuthenticated}
            redirectTo="/"
          />
          <UserContext.Provider value={user}>
            <PrivateRoute path="/"
              component={Dashboard}
              hasPermission={userIsAuthenticated}
            />
          </UserContext.Provider>
        </Switch>
      </Router>
    );
  }
}

export default Application;
