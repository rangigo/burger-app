import { put } from 'redux-saga/effects'

import * as actions from '../actions/index'

import axios from '../../axios-orders'

export function* purchaseSaga(action) {
  yield put(actions.purchaseStart())

  try {
    const res = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    )
    yield put(actions.purchaseSuccess(res.data.name, action.orderData))
  } catch (error) {
    yield put(actions.purchaseFail(error))
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart())
  const queryParams = `?auth=${action.token}&orderBy="userId"&userId="${
    action.userId
  }"`
  try {
    const res = yield axios.get('/orders.json' + queryParams)
    const fetchOrders = []
    for (let key in res.data) {
      yield fetchOrders.push({
        ...res.data[key],
        id: key
      })
    }
    yield put(actions.fetchOrdersSuccess(fetchOrders))
  } catch (err) {
    yield put(actions.fetchOrdersFail(err))
  }
}
