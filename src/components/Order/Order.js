import React from 'react'

import classes from './Order.css'

const order = props => {

  const ingredients = []

  for (let ingreName in props.ingredients) {
    ingredients.push({
      name: ingreName,
      amount: props.ingredients[ingreName]
    })
  }

  const out = ingredients.map(ingre => 
    <span
      style= {{
        textTransform: 'capitalize',
        margin: '0 5px',
        display: 'inline-block',
        padding: '2px',
        border: '1px solid #ccc'
      }}
      key={ingre.name}
    >{ingre.name}: {ingre.amount}</span>
  )

  return (
    <div className={classes.Order}>
      <p>Ingredients: {out}</p>
      <p>Price: {props.price.toFixed(2)}</p>
    </div>
  )
}

export default order
