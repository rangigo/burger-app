/*
  rce -> stateful component
  rfe -> stateless component
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthLogout()
  }

  render() {
    const routes = this.props.isAuth ? (
      <Switch>
        <Route path="/checkout" component={CheckOut} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/auth" component={Auth} />
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
