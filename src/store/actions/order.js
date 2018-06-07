import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'
export const purchaseSuccess = (id, orderData) =>  {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error
  }
}

export const purchaseStart = () =>  {
  return {
    type: actionTypes.PURCHASE_START
  }
};


export const purchase = (orderData) => {
  return dispatch => {
    dispatch(purchaseStart())
    axios
      .post("/orders.json", orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseSuccess(res.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseFail(error))
      })
  }
}
