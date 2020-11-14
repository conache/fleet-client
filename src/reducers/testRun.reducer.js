import Immutable from 'seamless-immutable';
import {actionTypes, initiateCreate} from "../actions/testRun.actions"

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case actionTypes.TEST_RUN_CREATE_SUCCESS:
      return state.merge(action.payload)
    default:
      return state;
  }
}

export const createTestRun = (testRun, fileSpec) => {
  return initiateCreate({testRun, fileSpec});
}