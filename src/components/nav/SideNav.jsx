import React from 'react';
import {withRouter} from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { connect } from 'react-redux';

class SideNav extends React.Component {
  render() {
    const { user, history, onLogoutClick} = this.props;

    return <div className="side-nav">
      <div className="side-nav-container logo" onClick={() => history.push("/")}>river._</div>
      <div className="side-nav-container user">
        <img alt="profile" className="profile-picture" src={user.picture} />
        {user ? <div className="user-details">
          <div>{user.email}</div>
          <div>{user.name}</div>
        </div> : null}
        
      </div>
      <div className="side-nav-container logout">
        <div className="logout-btn" onClick={() => onLogoutClick()}>
            <PowerSettingsNewIcon color="primary" />
            <div>logout</div>
        </div>
      </div>
    </div>
  }
}


export default connect(null, null)(withRouter(SideNav));

