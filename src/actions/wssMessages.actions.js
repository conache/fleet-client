import { createAction } from 'redux-actions';

export const actionTypes = {
  FILE_ENTITY_CREATED: "WSS/FILE_ENTITY_CREATED",
  TEST_RUN_STATE_CHANGE: "WSS/TEST_RUN_STATE_CHANGE",
}

export const fileEntityCreated = createAction(actionTypes.FILE_ENTITY_CREATED);
export const testRunStateChange = createAction(actionTypes.TEST_RUN_STATE_CHANGE);