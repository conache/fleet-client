import { takeEvery, call, put } from "redux-saga/effects";
import * as uiActions from "../actions/ui.actions";
import { actionTypes, getProfileSuccess, loginSuccess, logoutSuccess, signUpSuccess, setStatus } from "../actions/user.actions";
import wssConnector from "../services/wss-subscriber/WssConnector";
import * as UserApiService from "../api/user";
import {setAuthToken, removeAuthToken} from "../session";
import history from "../history";
import { USER_STATUS } from "../constants";

function* loginUser(action) {
  let response = {};
  try {
    yield put(setStatus({status: USER_STATUS.REQUESTING_AUTH}));
    response = yield call(() => UserApiService.login(action.payload))
    yield put(setStatus({status: null}));
    setAuthToken(response.token.token)
    yield put(loginSuccess(response.user))
    history.push("/")
  } catch (err) {
    yield put(uiActions.showErrorNotification({message: err.response?.data?.detail, anchorOrigin: {vertical: 'top',horizontal: 'right',}}));
  } finally {
    yield put(setStatus({status: null}));
  }
}

function* signUpUser(action) {
  try {
    yield put(setStatus({status: USER_STATUS.REQUESTING_CREATE}));
    yield call(() => UserApiService.signUp(action.payload))
    yield put(setStatus({status: null}))
    yield put(signUpSuccess())
    yield put(uiActions.showSuccessNotification({message: "Account successfully created", anchorOrigin: {vertical: 'top',horizontal: 'right',}}))
    history.push("/login")
  } catch (err) {
    yield put(uiActions.showErrorNotification({message: err.response?.data?.detail, anchorOrigin: {vertical: 'top',horizontal: 'right',}}));
  } finally {
    yield put(setStatus({status: null}))
  }
}

function* getUserProfile(action) {
  try {
    const response = yield call(() => UserApiService.getProfile())
    yield put(getProfileSuccess(response.user))
    wssConnector.connect()
  } catch (err) {
    yield put(uiActions.showErrorNotification({message: "Error encountered while getting your profile."}))
    console.log("Error encountered while retrieving user profile", err)
  }
}

function* logoutUser(action) {
  window.onunload = () => {}
  window.onbeforeunload = () => {}
  yield removeAuthToken()
  yield put(logoutSuccess())
  wssConnector.disconnect()
  window.location.href = "/"
}

export default function* watchAuthenticationSaga() {
  yield takeEvery(actionTypes.INITIATE_LOGIN, loginUser);
  yield takeEvery(actionTypes.INITIATE_SIGNUP, signUpUser);
  yield takeEvery(actionTypes.INITIATE_GET_PROFILE, getUserProfile);
  yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutUser);
}