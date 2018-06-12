import React from "react"

import burgerImg from "../../../assets/images/burger.svg"
import menuImg from '../../../assets/images/menu.svg'
import classes from "./Menu.css"

const menu = props => {
  return (
    <div className ={classes.Menu}>
      <img src={menuImg} alt="Menu" onClick={props.clicked} />
      <img src={burgerImg} alt="img"/>
    </div>
  )
}

export default menu
