import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Route, Switch} from "react-router-dom";
import {logout} from "../reducers/user.reducer";
import {withUser} from "../context/user";
import AllRunsPage from "./all-runs/AllRunsPage";


class Dashboard extends React.Component {
  render() {
    const {match, currentUser, logout} = this.props;
    
    return <React.Fragment>
    <div>{JSON.stringify(currentUser)}</div>
    <Switch>
      <Route exact path={`${match.path}`} component={AllRunsPage} />
    </Switch>
    <button onClick={logout}>Logout</button>
  </React.Fragment>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}
export default connect(null, mapDispatchToProps)(withUser(Dashboard));