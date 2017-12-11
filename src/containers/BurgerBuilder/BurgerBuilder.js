import React, { Component } from "react"

import Aux from "../../hoc/Auxi/Auxi"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"

const INGREDIENT_PRICES = {
  salad: 0.8,
  meat: 2.5,
  bacon: 1.7,
  cheese: 1
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4.5,
    // purchasable: false,
    purchasing: false
  }

  // updateStatePurchasable = ingredients => {
  //   let purchasable = Object.values(ingredients).some(quantity => quantity >= 0)
  //   this.setState({ purchasable: purchasable })
  // }

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
    alert("You continue")
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          backdropClick={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
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
  }
}

export default BurgerBuilder
