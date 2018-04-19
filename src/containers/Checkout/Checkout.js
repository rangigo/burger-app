import React, { Component } from "react"

import { Route } from "react-router-dom"

import CheckoutSummary from "../../components/Order/Checkout/CheckoutSummary"

import ContactData from "./ContactData/ContactData"

export class Checkout extends Component {
  constructor(props) {
    super(props)
    const query = new URLSearchParams(props.location.search)
    const newIngredients = {}

    let price = 0

    for (let param of query.entries()) {
      if (param[0] === "price") price = param[1]
      else newIngredients[param[0]] = +param[1]
    }

    this.state = { ingredients: newIngredients, totalPrice: price }
  }

  checkOutCancelled = () => {
    this.props.history.goBack()
  }

  checkOutContinued = () => {
    this.props.history.replace("/checkout/contact-data")
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkOutCancelled={this.checkOutCancelled}
          checkOutContinued={this.checkOutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    )
  }
}

export default Checkout
