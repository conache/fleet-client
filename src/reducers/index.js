import { combineReducers } from "redux"
import user from "./user.reducer"
import testRun from "./testRun.reducer"

export default combineReducers({
  user,
  testRun
})