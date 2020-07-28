import { isNil } from 'ramda';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token) => {
  if (!isNil(token)) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};
export const isAuthenticated = () => !!localStorage.getItem('token');
