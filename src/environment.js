function isProdEnvironment() {
  return process.env.REACT_APP_ENV === "prod"
}

export const __BASE_API_URL__ = isProdEnvironment() ? 'http://34.123.84.62' : "http://localhost:8080";
export const __BASE_SOCKET_SERVER_URL__ = isProdEnvironment() ? "http://35.238.148.47" : "localhost:3001";