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

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return ({
  type: actionTypes.AUTH_LOGOUT
})}

export const checkAuthTimeout = expiresTime => dispatch => {
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

  const url = isSignUp
    ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCdehiWifkod-mbWTNLGeiRByDdYghu6f4'
    : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCdehiWifkod-mbWTNLGeiRByDdYghu6f4'

  axios
    .post(url, authData)
    .then(res => {
      localStorage.setItem('token', res.data.idToken)
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + res.data.expiresIn * 1000))
      localStorage.setItem('userId', res.data.localId)
      dispatch(authSuccess(res.data.idToken, res.data.localId))
      dispatch(checkAuthTimeout(res.data.expiresIn))
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error))
    })
}

export const setAuthRedirPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
})

export const checkAuthState = () => dispatch => {
  const token = localStorage.getItem('token')
  if (!token) {
    dispatch(logout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      dispatch(logout())
    } else {
      const userId = localStorage.getItem('userId')
      dispatch(authSuccess(token, userId))
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000))
    }
  }
}