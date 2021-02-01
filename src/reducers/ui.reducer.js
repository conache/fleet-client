import Immutable from 'seamless-immutable';
import { actionTypes, clearNotification, setActiveModal, hideIfActive } from "../actions/ui.actions"

const defaultNotificationConfig = {
  message: "",
  variant: "default",
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  }
};

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case actionTypes.NOTIFICATION_SUCCESS:
      return state.merge({
        notification: {
          ...defaultNotificationConfig,
          ...action.payload,
          variant: "success",
        },
      });
    case actionTypes.NOTIFICATION_ERROR:
      return state.merge({
        notification: {
          ...defaultNotificationConfig,
          ...action.payload,
          variant: "error",
        },
      });
    case actionTypes.NOTIFICATION_CLEAR:
      return state.merge({
        notification: null,
      });
    case actionTypes.ACTIVE_MODAL:
      return state.merge({
        activeModal: action.payload,
      });
    case actionTypes.HIDE_MODAL:
      if (state.activeModal !== action.payload) {
        return state;
      }
      return state.merge({
        activeModal: null,
      });
    case actionTypes.HIDE_ACTIVE_MODAL:
      return state.merge({
        activeModal: null,
      });
    default:
      return state;
  }
}

export const clearNotifications = () => {
  return clearNotification();
}

export const showModal = (modalIdentificator) => {
  return setActiveModal(modalIdentificator)
}

export const hideAllModals = () => {
  return setActiveModal(null)
}

export const hideModal = (modalIdentificator) => {
  return hideIfActive(modalIdentificator)
}