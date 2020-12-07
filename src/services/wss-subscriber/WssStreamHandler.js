import store from "../../store"
import {fileEntityCreated} from "../../actions/wssMessages.actions";

export default class WssStreamHandler {
  handleMessage(msg={}) {
    const {type, data} = msg;
    switch (type) {
      case "wss.test_run_state_changed":
        this.handleTestRunStateChange(data)
        break
      default:
        console.warn("WSS message not recognized:", msg)
    }
  }

  handleTestRunStateChange(data) {
    switch (data.state) {
      case "file_upload":
        store.dispatch(fileEntityCreated(data))
        break
      default:
        console.warn("State change not handled:", data)
    }
  }
}