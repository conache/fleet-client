import { takeEvery, call, put } from "redux-saga/effects";
import * as TestRunApiService from "../api/testRun";
import { actionTypes, createSuccess, listSuccess } from "../actions/testRuns.actions";
import fileActions from "../actions/files.actions";
import { decodeTestRunStateMetadata } from "../utils";
import { RUN_STATES } from "../constants";

function* createTestRun(action) {
  try {
    const {testRun, fileSpec, jsFileObject} = action.payload;
    const response = yield call(() => TestRunApiService.create({testRun, fileSpec}))
    yield put(createSuccess({...response.testRun, state: RUN_STATES.INITIATED_DONE}))
    yield put(fileActions.shallowCreateFile({testRunId: response.testRun.id, jsObject: jsFileObject}))
  } catch (err) {
    console.log("Test run create error:", err)
  }
}

function* listTestRuns(action) {
  const response = yield call(() => TestRunApiService.list())
  const testRuns = response.testRuns || [];
  yield put(listSuccess(testRuns.map(run => {
    run.stateMetadata = decodeTestRunStateMetadata(run.stateMetadata)
    return run
  })))
}

export default function* watchTestRunsSaga() {
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_CREATE, createTestRun);
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_LIST, listTestRuns);
}