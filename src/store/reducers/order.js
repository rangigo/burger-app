import * as actionTypes from '../actions/actionTypes'

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          id: action.orderId,
          ...action.orderData
        })
      }
    case actionTypes.PURCHASE_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default reducer