import React, { Fragment } from "react";
import Application from './Application';
import {connect} from 'react-redux';

const ApplicationContainer = (props) => {
  return (
    <Fragment>
      <Application />
    </Fragment>
  )
}

export default connect(null, null)(ApplicationContainer);
