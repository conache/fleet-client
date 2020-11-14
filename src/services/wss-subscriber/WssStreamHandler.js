import store from "../../store"
import {fileEntityCreated} from "../../actions/wssMessages.actions";

export default class WssStreamHandler {
  handleMessage(msg={}) {
    const {type, data} = msg;
    switch (type) {
      case "fileEntityCreated":
        store.dispatch(fileEntityCreated(data))
        break
      default:
        console.warn("WSS message not recognized:", msg)
    }
  }
}