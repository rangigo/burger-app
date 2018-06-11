import React, { Component } from 'react'
import {connect} from 'react-redux'

import Order from '../../components/Order/Order'

import axios from '../../axios-orders'
import errorHandler from '../../hoc/errorHandler/errorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

export class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
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
        />
      ))
    )
    return <div>{orders}</div>
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios))
