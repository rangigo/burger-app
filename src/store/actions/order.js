import * as actionTypes from './actionTypes'

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

export const purchase = (orderData, token) => ({
  type: actionTypes.PURCHASE,
  orderData: orderData,
  token: token
})

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

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  token: token,
  userId: userId
})
