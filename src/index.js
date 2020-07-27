import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import ApplicationContainer from './components/ApplicationContainer';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <ApplicationContainer />
  </Provider>,
  document.getElementById('root'),
);

// remove this
