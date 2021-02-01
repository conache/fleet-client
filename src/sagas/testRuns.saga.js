import { takeEvery, call, put } from "redux-saga/effects";
import * as TestRunApiService from "../api/testRun";
import * as UploadsApiService from "../api/uploads";
import { actionTypes} from "../actions/testRuns.actions";
import * as uiActions from "../actions/ui.actions";
import * as testRunsActions from "../actions/testRuns.actions";
import fileActions from "../actions/files.actions";
import { decodeTestRunStateMetadata } from "../utils";
import { RUN_STATES, MAIN_PAGES_PATHS } from "../constants";
import history from "../history";

function forwardTo(location) {
  history.push(location);
}

function* createTestRun(action) {
  try {
    const {testRun, fileSpec, jsFileObject} = action.payload;
    yield put(testRunsActions.requestCreate())
    const response = yield call(() => TestRunApiService.create({testRun, fileSpec}))
    yield put(testRunsActions.createSuccess({...response.testRun, state: RUN_STATES.INITIATED_DONE}))
    yield put(uiActions.showSuccessNotification({message: "Run successfully created"}))
    yield put(uiActions.hideActiveModal())
    if (MAIN_PAGES_PATHS.indexOf(window.location.pathname) < 0) {
      forwardTo(MAIN_PAGES_PATHS[0])
    }
    yield put(fileActions.shallowCreateFile({testRunId: response.testRun.id, jsObject: jsFileObject}))
  } catch (err) {
    yield put(uiActions.showErrorNotification({message: "Test run couldn't be created."}));
    console.warn("Test run create error:", err)
  }
}

function* listTestRuns(action) {
  try {
    yield put(testRunsActions.requestList())
    const response = yield call(() => TestRunApiService.list())
    const testRuns = response.testRuns || [];
    yield put(testRunsActions.listSuccess(testRuns.map(run => {
      run.stateMetadata = decodeTestRunStateMetadata(run.stateMetadata);
      return run
    })));
  } catch (err) {
    yield put(uiActions.showErrorNotification({message: "Error encountered while listing your runs. Please refresh the app!"}))
    console.warn("Error encountered while listing test runs:", err);
  }
}

function* getTestRun(action) {
  let testRun = null;

  try {
    yield put(testRunsActions.requestGet({id: action.payload}))
    const resp = yield call(() => TestRunApiService.getTestRun(action.payload));
    testRun = resp.testRun;
    testRun.stateMetadata = decodeTestRunStateMetadata(testRun.stateMetadata);
    yield put(testRunsActions.getSuccess(testRun));
  } catch (err) {
    yield put(uiActions.showErrorNotification({message: "Error encountered while retrieving test run."}))
    console.warn("Error encountered while retrieving test run:", err);
    return;
  }

  try {
    const {file} = yield call(() => UploadsApiService.getFile(testRun.fileId))
    yield put(fileActions.getSuccess(file));
  } catch (err) {
    // yield put(uiActions.showErrorNotification({message: "Error retrieving file details for current test run."}))
    console.warn("Error encountered while retrieving file details for current test run:", err);
  }
}

export default function* watchTestRunsSaga() {
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_CREATE, createTestRun);
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_LIST, listTestRuns);
  yield takeEvery(actionTypes.TEST_RUN_INITIATE_GET, getTestRun);
}