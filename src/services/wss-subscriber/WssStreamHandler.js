export default class WssStreamHandler {
  handleMessage(msg={}) {
    console.log("Stream handler received message:", msg);
  }
}