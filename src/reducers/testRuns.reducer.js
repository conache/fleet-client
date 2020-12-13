import Immutable from 'seamless-immutable';
import {actionTypes, initiateCreate, inititateGet, inititateList} from "../actions/testRuns.actions"

export default function reducer(state = Immutable([]), action) {
  switch (action.type) {
    case actionTypes.TEST_RUN_CREATE_SUCCESS:
      return state.concat([action.payload])
    case actionTypes.TEST_RUN_LIST_SUCCESS:
      return Immutable(action.payload)
    case actionTypes.TEST_RUN_UPDATE_STATE:
      return state.map((testRun) => {
        if (testRun.id !== action.payload.testRunId) {
          return testRun;
        }
        
        return {
          ...testRun,
          ...action.payload
        }
      })
    case actionTypes.TEST_RUN_GET_SUCCESS:
      const existentTestRun = state.find(testRun => testRun.id === action.payload.id)
      if (!existentTestRun) {
        return state.concat([action.payload]);
      }

      return state.map((testRun) => {
        if (testRun.id !== action.payload.id) {
          return testRun;
        }

        return {
          ...existentTestRun,
          ...action.payload
        };
      });
    default:
      return state;
  }
}

export const createTestRun = (testRun, fileSpec, jsFileObject) => {
  return initiateCreate({testRun, fileSpec, jsFileObject});
}

export const listTestRuns = () => {
  return inititateList();
}

export const getTestRun = (id) => {
  return inititateGet(id);
}