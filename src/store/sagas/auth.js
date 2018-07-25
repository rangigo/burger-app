import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions/index'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')

  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expiresTime * 1000)

  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }

  const url = action.isSignUp
    ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCdehiWifkod-mbWTNLGeiRByDdYghu6f4'
    : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCdehiWifkod-mbWTNLGeiRByDdYghu6f4'

  try {
    const res = yield axios.post(url, authData)
    yield localStorage.setItem('token', res.data.idToken)
    yield localStorage.setItem(
      'expirationDate',
      new Date(new Date().getTime() + res.data.expiresIn * 1000)
    )
    yield localStorage.setItem('userId', res.data.localId)
    yield put(actions.authSuccess(res.data.idToken, res.data.localId))
    yield put(actions.checkAuthTimeout(res.data.expiresIn))
  } catch (err) {
    put(actions.authFail(err.response.data.error))
  }
}

export function* authCheckState(action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    )
    if (expirationDate <= new Date()) {
      yield put(actions.logout())
    } else {
      const userId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId))
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      )
    }
  }
}
