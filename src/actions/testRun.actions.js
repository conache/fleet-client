import { createAction } from 'redux-actions';

export const actionTypes = {
  TEST_RUN_INITIATE_CREATE: "TEST_RUN_INITIATE_CREATE",
  TEST_RUN_CREATE_SUCCESS: "TEST_RUN_CREATE_SUCCESS",
}

export const initiateCreate = createAction(actionTypes.TEST_RUN_INITIATE_CREATE);
export const createSuccess = createAction(actionTypes.TEST_RUN_CREATE_SUCCESS);