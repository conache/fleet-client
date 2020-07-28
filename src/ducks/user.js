// import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
// import * as User from '../api/user';
// import { setAuthToken } from '../session';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'user/AUTHENTICATE_LOADING':
      return state.merge({ authenticating: action.payload });
    case 'user/AUTHENTICATE':
      return state.merge({ isAuthenticated: action.payload });
    default:
      return state;
  }
}

// export const authenticate = createAction('user/AUTHENTICATE');
// export const loadingAuthenticate = createAction('user/AUTHENTICATE_LOADING');

// export const login = ({ username, password }) => {
//   return (dispatch) => {
//     dispatch(loadingAuthenticate(true));
//     return User.login(username, password)
//       .then((resp) => {
//         dispatch(loadingAuthenticate(false));
//         dispatch(authenticate(true));
//         setAuthToken(resp.body.token);
//       })
//       .catch((err) => {
//         dispatch(loadingAuthenticate(false));
//         NotificationManager.error(
//           `Could not load question. Please refresh the page. Error: ${err.message}`,
//         );
//       });
//   };
// };
