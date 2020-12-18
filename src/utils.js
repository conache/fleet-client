import { RUN_STATES } from "./constants";

export function decodeTestRunStateMetadata(metadata) {
  const decodedMetadata = atob(metadata || "");
  return decodedMetadata.trim() !== "" ? JSON.parse(decodedMetadata) : {};
}

export function isTerminalRunState(state) {
  return state === RUN_STATES.ERROR || state === RUN_STATES.FINISHED;
}