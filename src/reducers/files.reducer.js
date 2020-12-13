import Immutable from 'seamless-immutable';
import { actionTypes } from "../actions/files.actions"

export default function reducer(state = Immutable([]), action) {
  switch (action.type) {
    case actionTypes.FILE_SHALLOW_CREATE:
      return state.concat([action.payload])
    case actionTypes.FILE_UPDATE_BY_TEST_RUN_ID:
      return state.map((file) => {
        if (file.testRunId !== action.payload.testRunId) {
          return file;
        }
        
        return {
          ...file,
          ...action.payload.updateData
        }
      })
    case actionTypes.FILE_GET_SUCCESS:
      const existentFile = state.find(file => file.id === action.payload.id)
      if (!existentFile) {
        return state.concat([action.payload]);
      }

      return state.map((file) => {
        if (file.id !== action.payload.id) {
          return file;
        }

        return {
          ...existentFile,
          ...action.payload
        };
      });
    default:
      return state;
  }
}