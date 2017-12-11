import React from "react"

import classes from "./BuildControl.css"

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.IngreName}>{props.ingreName}</div>
      <button
        className={classes.Less}
        onClick={props.remove}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.add}>
        More
      </button>
    </div>
  )
}

export default buildControl
