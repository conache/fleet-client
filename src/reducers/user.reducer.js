import Immutable from 'seamless-immutable';
import {actionTypes, initiateGetProfile, initiateLogin, initiateLogout, initiateSignUp} from "../actions/user.actions"

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case actionTypes.SET_STATUS:
      return state.merge(action.payload);
    case actionTypes.LOGOUT_SUCCESS:
      return Immutable({});
    case actionTypes.GET_PROFILE_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return state.merge(action.payload);
    case actionTypes.SIGNUP_SUCCESS:
    default:
      return state;
  }
}

export const login = (userDetails) => {
  return initiateLogin(userDetails);
};

export const signUp = (userDetails) => {
  return initiateSignUp(userDetails);
}

export const getProfile = () => {
  return initiateGetProfile();
}
export const logout = () => {
  return initiateLogout();
}