import { takeEvery, call, put } from "redux-saga/effects";
import * as uiActions from "../actions/ui.actions";
import { actionTypes, getProfileSuccess, loginSuccess, logoutSuccess, signUpSuccess } from "../actions/user.actions";
import wssConnector from "../services/wss-subscriber/WssConnector";
import * as UserApiService from "../api/user";
import {setAuthToken, removeAuthToken} from "../session";
import history from "../history";

function* loginUser(action) {
  try {
    const response = yield call(() => UserApiService.login(action.payload))
    setAuthToken(response.token.token)
    yield put(loginSuccess(response.user))
    history.push("/")
  } catch (err) {
    console.log("Error encountered on login:", err)
  }
}

function* signUpUser(action) {
  try {
    yield call(() => UserApiService.signUp(action.payload))
    yield put(signUpSuccess())
  
    history.push("/login")
  } catch (err) {
    console.log("Error encountered on signUp", err)
  }
}

function* getUserProfile(action) {
  try {
    const response = yield call(() => UserApiService.getProfile())
    yield put(getProfileSuccess(response.user))
    wssConnector.connect()
  } catch (err) {
    yield put(uiActions.showErrorNotification("Error encountered while getting your profile."))
    console.log("Error encountered while retrieving user profile", err)
  }
}

function* logoutUser(action) {
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