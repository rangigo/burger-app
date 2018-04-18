import React, { Component } from "react"

import axios from "../../axios-orders"

import Aux from "../../hoc/Auxi/Auxi"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import errorHandler from "../../hoc/errorHandler/errorHandler"

const INGREDIENT_PRICES = {
  salad: 0.8,
  meat: 2.5,
  bacon: 1.7,
  cheese: 1
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.5,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  // updateStatePurchasable = ingredients => {
  //   let purchasable = Object.values(ingredients).some(quantity => quantity >= 0)
  //   this.setState({ purchasable: purchasable })
  // }

  componentDidMount() {
    axios
      .get("ingredients.json")
      .then(response => {
        const ingredients = response.data
        const totalPrice = Object.keys(ingredients)
          .map(ingreName => ingredients[ingreName] * INGREDIENT_PRICES[ingreName])
          .reduce((sum, el) => sum + el , 4.5)
          
        console.log(totalPrice)

        this.setState({ingredients: ingredients, totalPrice: totalPrice})
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1
    const updatedIngredient = {
      ...this.state.ingredients
    }

    updatedIngredient[type] = updatedCount
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice
    })

    // this.updateStatePurchasable(updatedIngredient)
  }

  removeIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] - 1
    const updatedIngredient = {
      ...this.state.ingredients
    }

    updatedIngredient[type] = updatedCount
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice
    })

    // this.updateStatePurchasable(updatedIngredient)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = []

    for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded! Error 404</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingreAdd={this.addIngredientHandler}
            ingreRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            // purchasable={this.state.purchasable}
          />
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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

export default errorHandler(BurgerBuilder, axios)
