import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as UserApiService from '../api/user';
import { setAuthToken } from '../session';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'user/GET_PROFILE_SUCCESS':
    case 'user/LOGIN_SUCCESS':
      console.log("Action payload:", action.payload);
      return state.merge(action.payload);
    default:
      return state;
  }
}

export const loginSuccess = createAction('user/LOGIN_SUCCESS');
export const getProfileSuccess = createAction('user/GET_PROFILE_SUCCESS');

export const login = (userLoginDetails) => {
  return (dispatch) => {
    return UserApiService.login(userLoginDetails)
      .then((resp) => {
        setAuthToken(resp.token.token);
        dispatch(loginSuccess(resp.user));
      })
      .catch((err) => {
        console.log("Error encountered on login:", err)
      });
  };
};

export const getProfile = () => {
  return (dispatch) => {
    console.log("Into get profile");
    return UserApiService.getProfile()
      .then((resp) => {
        dispatch(getProfileSuccess(resp.user))
      })
      .catch((err) => {
        console.log("Error encountered when retrieving profile:", err);
      });
  }
}