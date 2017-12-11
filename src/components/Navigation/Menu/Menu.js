import React from "react"

import burgerImg from "../../../assets/images/burger.svg"

import classes from "./Menu.css"

const menu = props => {
  return (
    <div className ={classes.Menu}>
      <img src={burgerImg} alt="Menu" onClick={props.clicked} />
    </div>
  )
}

export default menu
