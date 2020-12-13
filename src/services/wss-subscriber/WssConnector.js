import * as io from 'socket.io-client';
import {__BASE_SOCKET_SERVER_URL__} from "../../environment";
import { getAuthToken } from '../../session';
import WssStreamHandler from "./WssStreamHandler";

class WssConnector {
  socket = null;
  streamHandler = null;

  constructor(streamHandler) {
    this.streamHandler = streamHandler;
  }

  connect() {
    this.socket = io.connect(__BASE_SOCKET_SERVER_URL__, {"transports": ['websocket'], query: {token: getAuthToken()}})

    this.socket.on("connect", () => {
      console.log("Successfully connected to wss");
    });
    this.socket.on('disconnect', () => {
      console.log("Socket disconnected!!!");
    });
    this.socket.on("message", (msg) => {
      this.streamHandler.handleMessage(this.getParsedMessage(msg))
    });
  }

  getParsedMessage(message="") {
    return JSON.parse(message, (key, value) => {
      if (key === "data") {
        return JSON.parse(atob(value))
      }
      return value;
    });
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.disconnect();
  }
}

const streamHandler = new WssStreamHandler();
const wssConnector = new WssConnector(streamHandler);

export default wssConnector;