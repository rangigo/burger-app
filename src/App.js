/*
  rce -> stateful component
  rfe -> stateless component
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthLogout()
  }

  render() {
    const routes = this.props.isAuth ? (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
})

const mapDisPatchToProps = dispatch => ({
  onTryAuthLogout: () => dispatch(actions.checkAuthState())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDisPatchToProps
  )(App)
)
