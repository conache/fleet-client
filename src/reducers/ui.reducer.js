import Immutable from 'seamless-immutable';
import { actionTypes, clearNotification } from "../actions/ui.actions"

const defaultNotificationConfig = {
  message: "",
  variant: "default",
  anchorOrigin: {
    vertical: 'top',
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
    default:
      return state;
  }
}

export const clearNotifications = () => {
  return clearNotification();
}