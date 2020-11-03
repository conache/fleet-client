import React from "react";
import Application from './Application';
import {connect} from 'react-redux';
import { isAuthenticated } from "../session";
import {getProfile} from "../ducks/user";
import { bindActionCreators } from "redux";


class ApplicationContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.savedAuthStatus = isAuthenticated();
  }

  componentDidMount() {
    const {user} = this.props;

    if (isAuthenticated() && !user.id) {
      this.props.getProfile();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.savedAuthStatus !== isAuthenticated()) {
      this.savedAuthStatus = isAuthenticated();
      
      if (this.savedAuthStatus) {
        this.props.getProfile();
      }
    }

    return true;
  }

  render() {
    return <React.Fragment>
      <Application {...this.props}/>
    </React.Fragment>
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
