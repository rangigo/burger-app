import React from "react"

import classes from "./BuildControls.css"

import BuildControl from "./BuildControl/BuildControl"

const controls = [
  { ingreName: "Salad", type: "salad" },
  { ingreName: "Cheese", type: "cheese" },
  { ingreName: "Meat", type: "meat" },
  { ingreName: "Bacon", type: "bacon" }
]

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>Current Price: {props.price.toFixed(2)}€</strong>{" "}
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.ingreName}
          ingreName={ctrl.ingreName}
          add={() => props.ingreAdd(ctrl.type)}
          remove={() => props.ingreRemove(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'ORDER NOW!' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  )
}

export default buildControls
