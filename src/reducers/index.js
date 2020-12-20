import { combineReducers } from "redux"
import user from "./user.reducer"
import testRuns from "./testRuns.reducer"
import files from "./files.reducer"
import ui from "./ui.reducer"

export default combineReducers({
  user,
  testRuns,
  files,
  ui
})