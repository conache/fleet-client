import {createAction} from 'redux-actions'

export const actionTypes = {
  FILE_SHALLOW_CREATE: "FILE_SHALLOW_CREATE",
  FILE_UPDATE_BY_TEST_RUN_ID: "FILE_UPLOAD_BY_TEST_RUN_ID",
}

export const shallowCreateFile = createAction(actionTypes.FILE_SHALLOW_CREATE);
export const updateFileByTestRunId = createAction(actionTypes.FILE_UPDATE_BY_TEST_RUN_ID);

export default {
  shallowCreateFile,
  updateFileByTestRunId,
}