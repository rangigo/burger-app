import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary'
import ContactData from './ContactData/ContactData'

export class Checkout extends Component {
  checkOutCancelled = () => {
    this.props.history.goBack()
  }

  checkOutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingres)
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingres}
            checkOutCancelled={this.checkOutCancelled}
            checkOutContinued={this.checkOutContinued}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      )
    return summary
  }
}

const mapStateToProps = state => ({
  ingres: state.burgerBuilder.ingredients
})

export default connect(mapStateToProps)(Checkout)
