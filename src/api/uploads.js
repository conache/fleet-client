import {request, httpVerb } from './request'

export function createUpload(fileSpecification={}) {
  return request(httpVerb.POST, 'fileService/FileService/CreateFile', fileSpecification);
}

export function sendFileChunk(body={}) {
  return request(httpVerb.POST, 'fileService/FileService/CreateChunk', body);
}