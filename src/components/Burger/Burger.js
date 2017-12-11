import React from "react"

import classes from "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingreKeyName =>
      [...Array(props.ingredients[ingreKeyName])].map((_, index) => (
        <BurgerIngredient key={ingreKeyName + index} type={ingreKeyName} />
      ))
    )
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
 
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger
