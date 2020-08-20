import {request, httpVerb } from './request'

export function createUpload(fileSpecification={}) {
  return request(httpVerb.POST, 'file-service/createFile', fileSpecification);
}

export function sendFileChunk(body={}) {
  return request(httpVerb.POST, 'file-service/createChunk', body);
}