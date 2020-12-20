import {createAction} from 'redux-actions'

export const actionTypes = {
  NOTIFICATION_SUCCESS: "NOTIFICATION_SUCCESS",
  NOTIFICATION_ERROR: "NOTIFICATION_ERROR",
  NOTIFICATION_CLEAR: "NOTIFICATION_CLEAR",
}

export const showSuccessNotification = createAction(actionTypes.NOTIFICATION_SUCCESS);
export const showErrorNotification = createAction(actionTypes.NOTIFICATION_ERROR);
export const clearNotification = createAction(actionTypes.NOTIFICATION_CLEAR); 


export default {
  showSuccessNotification,
  showErrorNotification,
  clearNotification,
}