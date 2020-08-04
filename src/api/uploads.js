import {request, httpVerb } from './request'

export function createUpload() {
  return request(httpVerb.POST, 'upload/create');
}

export function sendFileChunk(arr) {
  return request(httpVerb.POST, 'upload/chunk', {chunk: arr});
}