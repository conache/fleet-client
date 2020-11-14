import {request, httpVerb} from "./request"

export function create(spec={}) {
  return request(httpVerb.POST, 'test-run-service/Create', spec)
}