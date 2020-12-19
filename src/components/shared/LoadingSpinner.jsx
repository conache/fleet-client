import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = () => {
  return <div className="spinner-container">
    <CircularProgress className="spinner" />
  </div>
}

export default LoadingSpinner;