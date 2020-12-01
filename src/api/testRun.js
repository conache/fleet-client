import {request, httpVerb} from "./request"

export function create(spec={}) {
  return request(httpVerb.POST, 'testRunService/Create', spec)
}