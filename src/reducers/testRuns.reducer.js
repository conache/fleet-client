import Immutable from 'seamless-immutable';
import moment from 'moment';
import { actionTypes, initiateCreate, inititateGet, inititateList } from "../actions/testRuns.actions"
import { RUN_STATES } from '../constants';
import { isTerminalRunState } from '../utils';


export default function reducer(state = Immutable({items: []}), action) {
  switch (action.type) {
    case actionTypes.TEST_RUN_REQUEST_CREATE:
      return state.merge({ isCreating: (state.isCreating || 0) + 1 }, { deep: true })
    case actionTypes.TEST_RUN_CREATE_SUCCESS:
      return state.merge({ items: [...state.items, action.payload], isCreating: state.isCreating - 1 }, { deep: true })
    case actionTypes.TEST_RUN_REQUEST_LIST:
      return state.merge({ isListLoading: true })
    case actionTypes.TEST_RUN_LIST_SUCCESS:
      return state.merge({ items: action.payload }).merge({ isListLoading: false })
    case actionTypes.TEST_RUN_UPDATE_STATE:
      const newTestRuns = state.items.map((testRun) => {
        if (!action.payload.state) {
          return testRun;
        }

        if (testRun.id !== action.payload.testRunId) {
          return testRun;
        }

        if (Object.values(RUN_STATES).indexOf(testRun.state) > Object.values(RUN_STATES).indexOf(action.payload.state)) {
          return testRun;
        }

        const newTestRun = { ...testRun, ...action.payload };
        if (isTerminalRunState(action.payload.state)) {
          newTestRun.FinishedAt = moment().format();
        }

        return newTestRun;
      });

      return state.merge({ items: newTestRuns });
    case actionTypes.TEST_RUN_REQUEST_GET:
      return state.merge({ requestingTestRunId: parseInt(action.payload.id) })
    case actionTypes.TEST_RUN_GET_SUCCESS:
      const existentTestRun = state.items.find(testRun => testRun.id === action.payload.id)
      if (!existentTestRun) {
        return state.merge({requestingTestRunId: null, items: [...state.items, action.payload] });
      }

      return state.merge({
        requestingTestRunId: null,
        items: state.items?.map((testRun) => {
          if (testRun.id !== action.payload.id) {
            return testRun;
          }

          return {
            ...existentTestRun,
            ...action.payload
          };
        }),
      });
    default:
      return state;
  }
}

export const createTestRun = (testRun, fileSpec, jsFileObject) => {
  return initiateCreate({ testRun, fileSpec, jsFileObject });
}

export const listTestRuns = () => {
  return inititateList();
}

export const getTestRun = (id) => {
  return inititateGet(id);
}