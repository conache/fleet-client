import { createAction } from 'redux-actions';

export const actionTypes = {
  INITIATE_LOGIN: "INITIATE_LOGIN",
  INITIATE_SIGNUP: "INITIATE_SIGNUP",
  INITIATE_GET_PROFILE: "INITIATE_GET_PROFILE",
  INITIATE_LOGOUT: "INITIATE_LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  SET_STATUS: "SET_STATUS",
}

export const initiateLogin = createAction(actionTypes.INITIATE_LOGIN);
export const initiateSignUp = createAction(actionTypes.INITIATE_SIGNUP);
export const initiateGetProfile = createAction(actionTypes.INITIATE_GET_PROFILE);
export const initiateLogout = createAction(actionTypes.INITIATE_LOGOUT);
export const loginSuccess = createAction(actionTypes.LOGIN_SUCCESS);
export const getProfileSuccess = createAction(actionTypes.GET_PROFILE_SUCCESS);
export const signUpSuccess = createAction(actionTypes.SIGNUP_SUCCESS);
export const logoutSuccess = createAction(actionTypes.LOGOUT_SUCCESS);
export const setStatus = createAction(actionTypes.SET_STATUS);