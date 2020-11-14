import { takeEvery, call, put } from "redux-saga/effects";
import * as TestRunApiService from "../api/testRun";
import { actionTypes, createSuccess } from "../actions/testRuns.actions";
import fileActions from "../actions/files.actions";

function* createTestRun(action) {
  try {
    const {testRun, fileSpec, jsFileObject} = action.payload;
    const response = yield call(() => TestRunApiService.create({testRun, fileSpec}))
    yield put(createSuccess(response.testRun))
    yield put(fileActions.shallowCreateFile({testRunId: response.testRun.id, jsObject: jsFileObject}))
  } catch (err) {
    console.log("Test run create error:", err)
  }
}

export default function* watchTestRunsSaga() {
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_CREATE, createTestRun);
}