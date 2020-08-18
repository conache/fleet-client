import {request, httpVerb } from './request'

export function createUpload(fileSpecification={}) {
  return request(httpVerb.POST, 'file-service/createFile', fileSpecification);
}

export function sendFileChunk(chunkBytes) {
  return request(httpVerb.POST, 'file-service/createChunk', {data: chunkBytes});
}