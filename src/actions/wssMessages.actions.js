import { createAction } from 'redux-actions';

export const actionTypes = {
  FILE_ENTITY_CREATED: "WSS/FILE_ENTITY_CREATED"
}

export const fileEntityCreated = createAction(actionTypes.FILE_ENTITY_CREATED);