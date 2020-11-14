import Immutable from 'seamless-immutable';
import {actionTypes, initiateCreate} from "../actions/testRuns.actions"

export default function reducer(state = Immutable([]), action) {
  switch (action.type) {
    case actionTypes.TEST_RUN_CREATE_SUCCESS:
      return state.concat([action.payload])
    default:
      return state;
  }
}

export const createTestRun = (testRun, fileSpec, jsFileObject) => {
  return initiateCreate({testRun, fileSpec, jsFileObject});
}