import React from "react";
import Application from './Application';
import {connect} from 'react-redux';
import { isAuthenticated } from "../session";
import {getProfile} from "../reducers/user.reducer";
import { bindActionCreators } from "redux";
import { SnackbarProvider } from 'notistack';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000'
    }
  }
});

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
    return <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Application {...this.props}/>
      </SnackbarProvider>
    </ThemeProvider>
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
