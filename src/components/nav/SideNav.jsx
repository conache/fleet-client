import React from 'react';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { bindActionCreators } from 'redux';
import { logout } from "../../reducers/user.reducer";
import { connect } from 'react-redux';

class SideNav extends React.Component {
  render() {
    const { user, logout } = this.props;

    return <div className="side-nav">
      <div className="side-nav-container logo">river._</div>
      <div className="side-nav-container user">
        <AccountCircleIcon className="account-icon"/>
        {user ? <div className="user-details">
          <div>{user.email}</div>
          <div>{user.name}</div>
        </div> : null}
        
      </div>
      <div className="side-nav-container logout">
        <div className="logout-btn" onClick={() => logout()}>
            <PowerSettingsNewIcon fontSize="larger" color="primary" />
            <div>logout</div>
        </div>
      </div>
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}
export default connect(null, mapDispatchToProps)(SideNav);

