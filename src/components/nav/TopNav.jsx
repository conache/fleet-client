import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

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

    switch(pagePath) {
      case "runs":
        return "Run overview"
      default:
        return "All runs"
    }
  }

  componentDidMount() {
    this.setState({title: this.getAssociatedTitle(window.location.pathname)})
    this.props.history.listen(() => {
      this.setState({title: this.getAssociatedTitle(window.location.pathname)})
    });
  }

  render() {
    return <AppBar position="static" className="top-nav">
      <Toolbar>
        <Typography variant="h6" className="page-title">
          {this.state.title}
        </Typography>
        <div className="buttons-section">
          <Button color="inherit">New run</Button>
        </div>
      </Toolbar>
    </AppBar>
  }
}

export default withRouter(TopNav);