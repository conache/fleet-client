import * as io from 'socket.io-client';
import {__BASE_SOCKET_SERVER_URL__} from "../../environment";

class SocketService {
  socket = null;

  // connectToServer(token) {
  //   let options = {
  //     query: {
  //       token: token
  //     }
  //   }
  //   this.socket = io( _BASE_SOCKET_SERVER_URL_, options);

  //   return new Promise((resolve, reject) => {
  //     this.socket.on('disconnect', _ => {
  //       console.log("Socket disconnected. It mey be not authorized.");  
  //       reject()
  //     });      
  //     this.socket.on('authorized', _ => {
  //       console.log("Authorized socket.");
  //       resolve();
  //     });
  //   });
  // }

  connectToServer() {
    this.socket = io(__BASE_SOCKET_SERVER_URL__)

    this.socket.on('msg', (msg) => {
      console.log("[Socket][Server]:", msg);
      this.socket.emit("initialized", "Hey! I'm initialized!")
    })
    this.socket.on('disconnect', () => {
      console.log("Socket disconnected!!!");
    });
  }

  onNotification(callback=() => {}) {
    if (!this.socket) {
      return;
    }
    
    this.socket.on("notification", (data) => callback(data));
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.disconnect();
  }
}
const socketService = new SocketService();

export default socketService;