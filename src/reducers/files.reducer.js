import Immutable from 'seamless-immutable';
import {actionTypes} from "../actions/files.actions"

export default function reducer(state = Immutable([]), action) {
  switch (action.type) {
    case actionTypes.FILE_SHALLOW_CREATE:
      return state.concat([action.payload])
    default:
      return state;
  }
}