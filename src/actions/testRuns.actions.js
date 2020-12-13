import { createAction } from 'redux-actions';

export const actionTypes = {
  TEST_RUN_INITIATE_CREATE: "TEST_RUN_INITIATE_CREATE",
  TEST_RUN_CREATE_SUCCESS: "TEST_RUN_CREATE_SUCCESS",
  TEST_RUN_INITIATE_LIST: "TEST_RUN_INITITATE_LIST",
  TEST_RUN_LIST_SUCCESS: "TEST_RUN_LIST_SUCCESS",
  TEST_RUN_UPDATE_STATE: "TEST_RUN_UPDATE_STATE",
  TEST_RUN_INITIATE_GET: "TEST_RUN_INITIATE_GET",
  TEST_RUN_GET_SUCCESS: "TEST_RUN_GET_SUCCESS",
}

export const initiateCreate = createAction(actionTypes.TEST_RUN_INITIATE_CREATE);
export const createSuccess = createAction(actionTypes.TEST_RUN_CREATE_SUCCESS);
export const inititateList = createAction(actionTypes.TEST_RUN_INITIATE_LIST);
export const listSuccess = createAction(actionTypes.TEST_RUN_LIST_SUCCESS);
export const inititateGet = createAction(actionTypes.TEST_RUN_INITIATE_GET);
export const getSuccess = createAction(actionTypes.TEST_RUN_GET_SUCCESS);
export const updateTestRunState = createAction(actionTypes.TEST_RUN_UPDATE_STATE);

export default {
  initiateCreate,
  createSuccess,
  inititateList,
  listSuccess,
  inititateGet,
  getSuccess,
  updateTestRunState,
}