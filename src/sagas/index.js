import authenticationSaga from "./user.saga"
import testRunSaga from "./testRun.saga"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([
    authenticationSaga(),
    testRunSaga(),
  ])
}