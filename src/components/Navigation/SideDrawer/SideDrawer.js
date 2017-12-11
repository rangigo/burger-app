import React from "react"

import classes from "./SideDrawer.css"

import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Auxi/Auxi"

const sideDrawer = (props) => {
  let assignedClasses = [classes.SideDrawer, classes.Close]
  props.show ? assignedClasses = [classes.SideDrawer, classes.Open] : null //eslint-disable-line

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.close}/>
      <div className={assignedClasses.join(' ')}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <ul>
          <NavigationItems />
        </ul>
      </div>
    </Aux>
  )
}

export default sideDrawer
