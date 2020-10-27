function isProdEnvironment() {
  return process.env.REACT_APP_ENV === "prod"
}

export const __BASE_API_URL__ = 'http://104.154.76.66';
export const __BASE_SOCKET_SERVER_URL__ = isProdEnvironment() ? "http://35.202.147.65" : "localhost:3001";