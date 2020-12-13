import store from "../../store"
import {fileEntityCreated, testRunStateChange} from "../../actions/wssMessages.actions";
import { RUN_STATES } from "../../constants";
import { decodeTestRunStateMetadata } from "../../utils.js";

export default class WssStreamHandler {
  handleMessage(msg={}) {
    const {type, data} = msg;
    console.log("[WSS] Message received:", msg);
    switch (type) {
      case "wss.test_run_state_changed":
        this.handleTestRunStateChange(data)
        break
      default:
        console.warn("WSS message not recognized:", msg)
    }
  }

  handleTestRunStateChange(data) {
    const {state, stateMetadata} = data;
    data.stateMetadata = decodeTestRunStateMetadata(stateMetadata)

    switch (data.state) {
      case RUN_STATES.FILE_UPLOAD:
        store.dispatch(fileEntityCreated(data))
        break
      default:
        store.dispatch(testRunStateChange(data))
    }
  }
}