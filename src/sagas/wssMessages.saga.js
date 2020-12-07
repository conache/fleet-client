import { takeEvery, put, select } from "redux-saga/effects";
import { actionTypes } from "../actions/wssMessages.actions";
import fileActions from "../actions/files.actions";
import fileUploadService from "../services/file-upload-service/FileUploadService";

const getFiles = state => state.files;

function* handleFileEntityCreation(action) {
  try {
    const {testRunId, stateMetadata} = action.payload
    console.log("Test run id:", testRunId, " - FileSpec", stateMetadata)
    yield put(fileActions.updateFileByTestRunId({testRunId: testRunId, updateData: JSON.parse(stateMetadata)}))
    const files = yield select(getFiles)
    const updatedFile = files.find(file => file.testRunId === testRunId);
    console.log("Updated file:", updatedFile)
    fileUploadService.startFileUpload(updatedFile.id, updatedFile.jsObject)
  } catch (err) {
    console.log("Test run create error:", err)
  }
}

export default function* watchWssMessagesSaga() {
  yield takeEvery(actionTypes.FILE_ENTITY_CREATED, handleFileEntityCreation);
}