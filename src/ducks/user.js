import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as UserApiService from '../api/user';
import { setAuthToken } from '../session';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'user/GET_PROFILE_SUCCESS':
    case 'user/LOGIN_SUCCESS':
      return state.merge(action.payload);
    case 'user/SIGNUP_SUCCESS':
    default:
      return state;
  }
}

export const loginSuccess = createAction('user/LOGIN_SUCCESS');
export const getProfileSuccess = createAction('user/GET_PROFILE_SUCCESS');
export const signUpSuccess = createAction('user/SIGNUP_SUCCESS');

export const login = (userDetails) => {
  return (dispatch) => {
    return UserApiService.login(userDetails)
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
    return UserApiService.getProfile()
      .then((resp) => {
        dispatch(getProfileSuccess(resp.user))
      })
      .catch((err) => {
        console.log("Error encountered when retrieving profile:", err);
      });
  }
}

export const signUp = (userDetails) => {
  return (dispatch) => {
    return UserApiService.signUp(userDetails)
      .then(() => {
        dispatch(signUpSuccess())
      })
      .catch((err) => {
        console.log("Error encountered when signing up:", err);
      })
  }
}