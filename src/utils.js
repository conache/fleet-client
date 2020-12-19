import { RUN_STATES } from "./constants";

export function decodeTestRunStateMetadata(metadata) {
  const decodedMetadata = atob(metadata || "");
  return decodedMetadata.trim() !== "" ? JSON.parse(decodedMetadata) : {};
}

export function isTerminalRunState(state) {
  return state === RUN_STATES.ERROR || state === RUN_STATES.FINISHED;
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}