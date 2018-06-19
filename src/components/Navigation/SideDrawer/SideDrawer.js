import React from "react"

import classes from "./SideDrawer.css"

import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Auxi/Auxi"

const sideDrawer = (props) => {
  const assignedClasses = props.show ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close] 

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.close}/>
      <div className={assignedClasses.join(' ')} onClick={props.close}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <ul>
          <NavigationItems isAuth={props.isAuth} />
        </ul>
      </div>
    </Aux>
  )
}

export default sideDrawer
