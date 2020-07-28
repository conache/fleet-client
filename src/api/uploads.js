import {request, httpVerb } from './request'

export function createUpload() {
  console.log("Crete upload using the API");
  return request(httpVerb.POST, 'upload/create');
}

export function sendFileChunk() {
  return new Promise();
}