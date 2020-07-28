import {request, httpVerb } from './request'

export function createUpload() {
  console.log("Crete upload using the API");
  return request(httpVerb.POST, 'upload/create');
}

export function sendFileChunk(arr) {
  return request(httpVerb.POST, 'upload/chunk', {chunk: arr});
}