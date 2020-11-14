import {createAction} from 'redux-actions'

export const actionTypes = {
  FILE_SHALLOW_CREATE: "FILE_SHALLOW_CREATE",
}

export const shallowCreateFile = createAction(actionTypes.FILE_SHALLOW_CREATE);

export default {
  shallowCreateFile,
}