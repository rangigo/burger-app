/*
  rce -> stateful component
  rfe -> stateless component
*/

import React, { Component } from "react"

import { Switch, Route } from 'react-router-dom'

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import CheckOut from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={CheckOut} />
            <Route path='/auth' component={Auth} />
            <Route path='/orders' component={Orders} />
            <Route path='/logout' component={Logout} />
            <Route path='/' component={BurgerBuilder}  />
            {/* <Route render={() => <h1>Error</h1>} /> */}
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
