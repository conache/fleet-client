import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../style/Application.scss';
import { connect } from 'react-redux';
import Upload from './upload/Upload';


class Application extends Component {
  render() {
    return (
        <Router>
          <Route exact path="/" component={Upload} />
        </Router>
    );
  }
}


export default connect(null, null)(Application);
