import { takeEvery, put, select } from "redux-saga/effects";
import { actionTypes } from "../actions/wssMessages.actions";
import fileActions from "../actions/files.actions";
import testRunActions from "../actions/testRuns.actions";
import fileUploadService from "../services/file-upload-service/FileUploadService";
import { RUN_STATES } from "../constants";

const getFiles = state => state.files;

function* handleFileEntityCreation(action) {
  try {
    const {testRunId, stateMetadata} = action.payload
    console.log("Test run id:", testRunId, " - FileSpec", stateMetadata)
    yield put(fileActions.updateFileByTestRunId({testRunId: testRunId, updateData: stateMetadata}))
    const files = yield select(getFiles)
    const updatedFile = files.find(file => file.testRunId === testRunId);
    yield put(testRunActions.updateTestRunState({testRunId: updatedFile.testRunId, state: RUN_STATES.FILE_UPLOAD}))
    fileUploadService.startFileUpload(updatedFile.id, updatedFile.jsObject)
  } catch (err) {
    console.log("Test run create error:", err)
  }
}

function* handleTestRunStateChange(action) {
  yield put(testRunActions.updateTestRunState(action.payload))
}

export default function* watchWssMessagesSaga() {
  yield takeEvery(actionTypes.FILE_ENTITY_CREATED, handleFileEntityCreation);
  yield takeEvery(actionTypes.TEST_RUN_STATE_CHANGE, handleTestRunStateChange);
}