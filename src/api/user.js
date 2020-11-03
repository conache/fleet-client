import {request, httpVerb } from "./request"

export function login(userDetails={}) {
  return request(httpVerb.POST, 'user-service/Authenticate', userDetails);
}

export function getProfile() {
  return request(httpVerb.GET, 'user-service/GetProfile');
}

export function signUp(userDetails) {
  return request(httpVerb.POST, 'user-service/Create', userDetails);
}