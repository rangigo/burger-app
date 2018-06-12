import React from "react"

import classes from "./Toolbar.css"

import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"

import Menu from '../Menu/Menu'

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <Menu clicked={props.openMenu}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </header>
  )
}

export default toolbar
