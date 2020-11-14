import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
// import Immutable from 'seamless-immutable';

import rootSaga from "./sagas"

import rootReducer from "./reducers"

// Middlewares
const logger = (store) => (next) => (action) => {
  const result = next(action);
  console.groupCollapsed('[ACTION]', action.type);
  console.log('Payload:', action.payload);
  console.log('State:', store.getState());
  console.groupEnd('[ACTION]', action.type);

  return result;
};

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export default store;
