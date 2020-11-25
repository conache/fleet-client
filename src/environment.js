function isProdEnvironment() {
  return process.env.REACT_APP_ENV === "prod"
}

export const __BASE_API_URL__ = isProdEnvironment() ? 'http://35.193.21.247' : "http://localhost:8080";
export const __BASE_SOCKET_SERVER_URL__ = isProdEnvironment() ? "http://34.123.84.62" : "localhost:3001";