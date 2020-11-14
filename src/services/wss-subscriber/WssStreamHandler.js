import store from "../../store"

export default class WssStreamHandler {
  handleMessage(msg={}) {
    const {type, data} = msg;
    switch (type) {
      case "fileEntityCreated":
        console.log("Data received:", data)
        break
      default:
        console.warn("WSS message not recognized:", msg)
    }
  }
}