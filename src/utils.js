export function decodeTestRunStateMetadata(metadata) {
  const decodedMetadata = atob(metadata || "");
  return decodedMetadata.trim() !== "" ? JSON.parse(decodedMetadata) : {};
}