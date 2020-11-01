import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
  const {hasPermission, redirectTo} = props;
  return hasPermission ? <Route {...props} /> : <Redirect to={{pathname: redirectTo}} />
}

PrivateRoute.prototype = {
  hasPermission: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string
}

PrivateRoute.defaultProps = {
  redirectTo: "/landing"
}

export default PrivateRoute