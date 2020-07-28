import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'app/APP_LOADING':
      return state.merge({ appLoading: true });
    case 'app/APP_LOADED':
      return state.merge({ appLoading: false });
    default:
      return state;
  }
}

export const appLoading = createAction('app/APP_LOADING');
export const appLoaded = createAction('app/APP_LOADED');

export const loading = () => {
  return (dispatch) => {
    dispatch(appLoading());
  };
};

export const loaded = () => {
  return (dispatch) => {
    dispatch(appLoaded());
  };
};
