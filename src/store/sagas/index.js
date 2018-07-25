import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckState } from './auth'
import { initIngredientSaga } from './burgerBuilder';
import { purchaseSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState)
}

export function* watchBugerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga)
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE, purchaseSaga)
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}