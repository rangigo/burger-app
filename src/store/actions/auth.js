import * as actionTypes from './actionTypes'

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
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const checkAuthTimeout = expiresTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expiresTime: expiresTime
})

export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email: email,
  password: password,
  isSignUp: isSignUp
})

export const setAuthRedirPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
})

export const checkAuthState = () => ({
  type: actionTypes.AUTH_CHECK_STATE
})
