import React from 'react';
import { withSnackbar } from 'notistack';
import {pathOr} from 'rambda';
import {connect} from 'react-redux';
import {clearNotifications} from "../../reducers/ui.reducer";
import {bindActionCreators} from "redux";


class Notification extends React.Component {
  componentDidUpdate(prevProps) {
    const {notification} = this.props;
    if (!notification) {
      return;
    }
    
    this.props.enqueueSnackbar(notification.message, notification);
    this.props.clearNotifications();
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    notification: pathOr(null, ["ui", "notification"], state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearNotifications }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notification));
