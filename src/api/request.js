import axios from 'axios';
import { mergeDeepLeft } from 'ramda';
import { __BASE_API_URL__ } from '../environment';
import { getAuthToken, isAuthenticated } from '../session';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers': 'X-Requested-With", "Origin", "Content-Type", "Accept"',
};

function createFullUrl(url) {
  return `${__BASE_API_URL__}/${url}`;
}

export function request(method = 'GET', url, body = {}, headers = {}) {
  if (isAuthenticated()) {
    headers = {
      ...headers,
      "Authorization": `Bearer ${getAuthToken()}`,
    }
  }

  return axios({
    method,
    url: createFullUrl(url),
    data: body,
    headers: mergeDeepLeft(defaultHeaders, headers),
    crossDomain: true,
  }).then((resp) => {
    if (resp.data.exceptionThrown) {
      throw new Error(resp.data.message);
    }
    return resp.data;
  });
}

export const httpVerb = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
});
