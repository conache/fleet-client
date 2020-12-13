import { takeEvery, call, put } from "redux-saga/effects";
import * as TestRunApiService from "../api/testRun";
import * as UploadsApiService from "../api/uploads";
import { actionTypes, createSuccess, listSuccess} from "../actions/testRuns.actions";
import * as testRunsActions from "../actions/testRuns.actions";
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
    console.error("Test run create error:", err)
  }
}

function* listTestRuns(action) {
  try {
    const response = yield call(() => TestRunApiService.list())
    const testRuns = response.testRuns || [];
    yield put(listSuccess(testRuns.map(run => {
      run.stateMetadata = decodeTestRunStateMetadata(run.stateMetadata);
      return run
    })))
  } catch (err) {
    console.error("Error encountered while listing test runs:", err);
  }
}

function* getTestRun(action) {
  try {
    const {testRun} = yield call(() => TestRunApiService.getTestRun(action.payload));
    yield put(testRunsActions.getSuccess(testRun));
    const {file} = yield call(() => UploadsApiService.getFile(testRun.fileId))
    yield put(fileActions.getSuccess(file));
  } catch (err) {
    console.error("Error encountered while retrieving test run:", err);
  }
}

export default function* watchTestRunsSaga() {
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_CREATE, createTestRun);
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_LIST, listTestRuns);
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_GET, getTestRun);
}