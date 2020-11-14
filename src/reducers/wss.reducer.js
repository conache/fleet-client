import Immutable from 'seamless-immutable';
import {actionTypes, initiateCreate} from "../actions/testRuns.actions"

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const createTestRun = (testRun, fileSpec) => {
  return initiateCreate({testRun, fileSpec});
}