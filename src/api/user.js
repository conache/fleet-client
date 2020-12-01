import {request, httpVerb } from "./request"

export function login(userDetails={}) {
  return request(httpVerb.POST, 'userService/Authenticate', userDetails);
}

export function getProfile() {
  return request(httpVerb.GET, 'userService/GetProfile');
}

export function signUp(userDetails) {
  return request(httpVerb.POST, 'userService/Create', userDetails);
}