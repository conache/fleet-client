import authenticationSaga from "./user.saga"
import testRunsSaga from "./testRuns.saga"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([
    authenticationSaga(),
    testRunsSaga(),
  ])
}