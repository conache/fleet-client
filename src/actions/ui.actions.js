import {createAction} from 'redux-actions'

export const actionTypes = {
  NOTIFICATION_SUCCESS: "NOTIFICATION_SUCCESS",
  NOTIFICATION_ERROR: "NOTIFICATION_ERROR",
  NOTIFICATION_CLEAR: "NOTIFICATION_CLEAR",
  ACTIVE_MODAL: "ACTIVE_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
  HIDE_ACTIVE_MODAL: "HIDE_ACTIVE_MODAL",
}

export const showSuccessNotification = createAction(actionTypes.NOTIFICATION_SUCCESS);
export const showErrorNotification = createAction(actionTypes.NOTIFICATION_ERROR);
export const clearNotification = createAction(actionTypes.NOTIFICATION_CLEAR); 
export const setActiveModal = createAction(actionTypes.ACTIVE_MODAL);
export const hideIfActive = createAction(actionTypes.HIDE_MODAL);
export const hideActiveModal = createAction(actionTypes.HIDE_ACTIVE_MODAL);

export default {
  showSuccessNotification,
  showErrorNotification,
  clearNotification,
  setActiveModal,
  hideIfActive
}