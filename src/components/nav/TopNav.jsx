import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {MAIN_PAGES_PATHS} from "../../constants";
import { Grid } from '@material-ui/core';


const MAIN_PAGE_TITLE = "All runs";

class TopNav extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      title: "",
    };
  }

  getAssociatedTitle(pathname) {
    const splittedPath = pathname.split("/");
    const pagePath = splittedPath[splittedPath.length - 2]

    switch (pagePath) {
      case "runs":
        return "Run overview"
      default:
        return MAIN_PAGE_TITLE
    }
  }

  componentDidMount() {
    this.setState({ title: this.getAssociatedTitle(window.location.pathname) })
    this.props.history.listen(() => {
      this.setState({ title: this.getAssociatedTitle(window.location.pathname) })
    });
  }

  render() {
    const {testRunsCount} = this.props;

    return <AppBar position="static" className="top-nav">
        <Grid item xs={2}>
        </Grid>
        <Toolbar className="top-nav-toolbar">
        {MAIN_PAGES_PATHS.indexOf(window.location.pathname) >= 0 ? null 
            : <IconButton className="top-nav-back-btn" color="inherit" onClick={() => this.props.history.goBack()}>
              <ArrowBackIosRoundedIcon className="top-nav-back-icon" />
            </IconButton>
        }
          <Typography className="page-title">
            {this.state.title}
            {this.state.title !== MAIN_PAGE_TITLE ? 
              null : <div className="page-title-results-label">{testRunsCount > 1 ? ` - ${testRunsCount} results` : ""}</div>
            }
          </Typography>
          <div className="buttons-section">
            <Button color="inherit" onClick={() => this.props.onNewRunClick()}>New run</Button>
          </div>
        </Toolbar>
    </AppBar>
  }
}

export default withRouter(TopNav);