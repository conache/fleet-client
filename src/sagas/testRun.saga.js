import { takeEvery, call, put } from "redux-saga/effects";
import * as TestRunApiService from "../api/testRun";
import { actionTypes, createSuccess } from "../actions/testRun.actions";

function* createTestRun(action) {
  try {
    const response = yield call(() => TestRunApiService.create(action.payload))
    yield put(createSuccess(response.testRun))
  } catch (err) {
    console.log("Test run create error:", err)
  }
}

export default function* watchTestRunSaga() {
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_CREATE, createTestRun);
}