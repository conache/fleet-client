import React from 'react';
import history from "../history";
import { Button } from "@material-ui/core";
import { takeEvery, put, select, call } from "redux-saga/effects";
import * as TestRunApiService from "../api/testRun";
import { actionTypes } from "../actions/wssMessages.actions";
import fileActions from "../actions/files.actions";
import testRunActions from "../actions/testRuns.actions";
import fileUploadService from "../services/file-upload-service/FileUploadService";
import { RUN_STATES } from "../constants";
import { decodeTestRunStateMetadata, isTerminalRunState } from "../utils";
import uiActions from "../actions/ui.actions";

const getFiles = state => state.files;

function* handleFileEntityCreation(action) {
  try {
    const { testRunId, stateMetadata } = action.payload;
    yield put(fileActions.updateFileByTestRunId({ testRunId: testRunId, updateData: stateMetadata }));
    const files = yield select(getFiles);
    const updatedFile = files.find(file => file.testRunId === testRunId);
    yield put(testRunActions.updateTestRunState({ testRunId: updatedFile.testRunId, state: RUN_STATES.FILE_UPLOAD }));
    fileUploadService.startFileUpload(updatedFile.id, updatedFile.jsObject);
  } catch (err) {
    console.warn("[WSS saga] Test run create error:", err);
  }
}

function* handleTestRunStateChange(action) {
  yield put(testRunActions.updateTestRunState(action.payload));
  if (!isTerminalRunState(action.payload.state)) {
    return;
  }
  const response = yield call(() => TestRunApiService.getTestRun(action.payload.testRunId));
  response.testRun.stateMetadata = decodeTestRunStateMetadata(response.testRun.stateMetadata);
  yield put(testRunActions.getSuccess(response.testRun));
  if (action.payload.state === RUN_STATES.ERROR) {
    yield put(uiActions.showErrorNotification({ message: `Test run '${response.testRun.name}' finished with error.` }));
    return;
  }
  yield put(uiActions.showSuccessNotification({message: `Test run '${response.testRun.name}' successfully finished.`,
    action: (key) => {
      const handleActionButtonClick = () => {
        history.push(`/runs/${response.testRun.id}`);
      }

      return <Button key={key} color="inherit" onClick={handleActionButtonClick}>See results</Button>
    }
  }));
}

export default function* watchWssMessagesSaga() {
  yield takeEvery(actionTypes.FILE_ENTITY_CREATED, handleFileEntityCreation);
  yield takeEvery(actionTypes.TEST_RUN_STATE_CHANGE, handleTestRunStateChange);
}