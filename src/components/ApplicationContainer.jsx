import React from "react";
import Application from './Application';
import {connect} from 'react-redux';
import { isAuthenticated } from "../session";


class ApplicationContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.authStatus = isAuthenticated();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.authStatus !== isAuthenticated()) {
      this.authStatus = isAuthenticated();
      return true;
    }

    return false;
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

export default connect(mapStateToProps, null)(ApplicationContainer);
