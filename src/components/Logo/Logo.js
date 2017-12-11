import React from 'react'

import classes from './Logo.css'
import burgerLogo from '../../assets/images/Valve_logo.svg'
const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt='Valve®'/>
    </div>
  )
}

export default logo
