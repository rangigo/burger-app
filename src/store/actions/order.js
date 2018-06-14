import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'
export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseFail = error => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error
  }
}

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START
  }
}

export const purchase = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseStart())
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(res => {
        dispatch(purchaseSuccess(res.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseFail(error))
      })
  }
}

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
})

export const fetchOrdersFail = err => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  err: err
})

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders,
  loading: false
})

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
})

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart())
  const queryParams = `?auth=${token}&orderBy="userId"&userId="${userId}"`
  axios
    .get('/orders.json'+queryParams)
    .then(res => {
      const fetchOrders = []
      for (let key in res.data) {
        fetchOrders.push({
          ...res.data[key],
          id: key
        })
      }
       dispatch(fetchOrdersSuccess(fetchOrders))
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err))
    })
}
