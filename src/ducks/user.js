import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as UserApiService from '../api/user';
import { setAuthToken } from '../session';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'user/LOGIN_SUCCESS':
      console.log("Login success matched action:", action);
      return state.merge({ user: action.payload });
    default:
      return state;
  }
}

export const loginSuccess = createAction('user/LOGIN_SUCCESS');

export const login = (userLoginDetails) => {
  return (dispatch) => {
    return UserApiService.login(userLoginDetails)
      .then((resp) => {
        dispatch(loginSuccess(resp.user));
        setAuthToken(resp.token.token);
      })
      .catch((err) => {
        console.log("Error encountered on login:", err)
      });
  };
};
