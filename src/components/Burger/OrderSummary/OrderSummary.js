import React from "react"

import Aux from "../../../hoc/Auxi/Auxi"
import Button from "../../UI/Button/Button"

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingreKeyName => (
    <li key={ingreKeyName}>
      <span style={{ textTransform: "capitalize" }}>{ingreKeyName}</span>:{" "}
      {props.ingredients[ingreKeyName]}
    </li>
  ))

  return (
    <Aux>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}€</strong>
      </p>
      <h3>Your order</h3>
      <p>Your MegaBurger contains: </p>
      <ul style={{ margin: "0 auto", display: "table" }}>
        <li>Breads</li>
        {ingredientSummary}
      </ul>
      <p>Proceed to checkout?</p>
      <Button btnType="Danger" clicked={props.cancelPurchase}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continuePurchase}>
        Continue
      </Button>
    </Aux>
  )
}

export default orderSummary
