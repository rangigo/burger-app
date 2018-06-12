import * as actionTypes from './actionTypes'

import axios from 'axios'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token: token,
  userId: userId
})

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
})

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const checkAuthTimeout = (expiresTime) => dispatch => {
  setTimeout(() => {
    dispatch(logout())
  }, expiresTime * 1000)
}

export const auth = (email, password, isSignUp) => dispatch => {
  dispatch(authStart())
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  }

  const url = isSignUp ? 
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCdehiWifkod-mbWTNLGeiRByDdYghu6f4'
  : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCdehiWifkod-mbWTNLGeiRByDdYghu6f4'

  axios
    .post(url, authData)
    .then(res => {
      dispatch(authSuccess(res.data.idToken, res.data.localId))
      dispatch(checkAuthTimeout(res.data.expiresIn))
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error))
    })
}

export const setAuthRedirPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
})
