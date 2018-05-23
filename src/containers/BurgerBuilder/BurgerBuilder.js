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
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  updateStatePurchasable = ingredients =>
    Object.values(ingredients).some(quantity => quantity > 0)

  componentDidMount() {
    // axios
    //   .get('ingredients.json')
    //   .then(response => {
    //     const ingredients = response.data
    //     const totalPrice = Object.keys(ingredients)
    //       .map(
    //         ingreName => ingredients[ingreName] * INGREDIENT_PRICES[ingreName]
    //       )
    //       .reduce((sum, el) => sum + el, 4.5)
    //     console.log(totalPrice)
    //     this.setState({ ingredients: ingredients, totalPrice: totalPrice })
    //   })
    //   .catch(error => {
    //     this.setState({ error: true })
    //   })
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

    let burger = this.state.error ? (
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
    ingres: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingreName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingreName }),
    onIngredientRemoved: ingreName =>
      dispatch({
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: ingreName
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  errorHandler(BurgerBuilder, axios)
)
