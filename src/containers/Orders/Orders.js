import React, { Component } from 'react'
import {connect} from 'react-redux'

import Order from '../../components/Order/Order'

import axios from '../../axios-orders'
import errorHandler from '../../hoc/errorHandler/errorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

export class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }

  render() {
    const orders = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
          orderData={order.orderData}
        />
      ))
    )
    return <div>{orders}</div>
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios))
