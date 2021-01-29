import {request, httpVerb, createFullUrl} from "./request"

export function create(spec={}) {
  return request(httpVerb.POST, 'testRunService/Create', spec);
}

export function list() {
  return request(httpVerb.GET, 'testRunService/List');
}

export function getTestRun(id) {
  return request(httpVerb.POST, 'testRunService/Get', {id});
}

export function forceStopTestRun(id) {
  navigator.sendBeacon(createFullUrl("testRunService/ForceStop"), JSON.stringify({testRunId: id}));
}