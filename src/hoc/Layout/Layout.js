import React, { Component } from "react"
import {connect} from 'react-redux'

import Aux from "../../hoc/Auxi/Auxi"
import classes from "./Layout.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  closeSideDrawerHanlder = () => {
    this.setState({showSideDrawer: false})
  }
  
  openSideDrawerHandler = () => {
    this.setState({showSideDrawer: true})
  }


  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuth} openMenu={this.openSideDrawerHandler}/>
        <SideDrawer isAuth={this.props.isAuth} show={this.state.showSideDrawer} close={this.closeSideDrawerHanlder} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)
