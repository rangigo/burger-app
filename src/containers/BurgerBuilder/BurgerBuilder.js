import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'

import Aux from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../hoc/errorHandler/errorHandler'
import * as burgerBuilderActions from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  updateStatePurchasable = ingredients =>
    Object.values(ingredients).some(quantity => quantity > 0)

  componentDidMount() {
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = { ...this.props.ingres }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded! Error 404</p>
    ) : (
      <Spinner />
    )

    if (this.props.ingres) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingres} />
          <BuildControls
            ingreAdd={this.props.onIngredientAdded}
            ingreRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            ordered={this.purchaseHandler}
            purchasable={this.updateStatePurchasable(this.props.ingres)}
          />
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingres}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.props.price}
        />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          backdropClick={this.purchaseCancelHandler}
          loading={this.state.loading}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingres: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingreName =>
      dispatch(burgerBuilderActions.addIngredient(ingreName)),
    onIngredientRemoved: ingreName =>
      dispatch(burgerBuilderActions.deleteIngredient(ingreName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  errorHandler(BurgerBuilder, axios)
)
