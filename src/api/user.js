import {request, httpVerb } from "./request"

export function login(userLoginDetails={}) {
  return request(httpVerb.POST, 'user-service/Authenticate', userLoginDetails);
}