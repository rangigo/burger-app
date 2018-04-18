import React, { Component } from 'react'

import classes from './ContactData.css'

import Button from '../../UI/Button/Button'

import axios from '../../../axios-orders'

import Spinner from '../../UI/Spinner/Spinner'

export class ContactData extends Component {
  state = {
    contact: {
      name: '',
      emai: '',
      address: '',
      phone: ''
    },
    loading: false
  }
  
  orderHandler = () => {
    this.setState({ loading: true })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Panigo",
        address: {
          street: "21 Thug",
          zipcode: "12303",
          city: "Helsinki"
        },
        phone: "0123430"
      },
      deliveryMethod: "fastest"
    }

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false})
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false})
      })
  }

 
  render() {
    let form = (
          <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your name' />
            <input className={classes.Input} type='email' name='email' placeholder='Your email' />
            <input className={classes.Input} type='text' name='address' placeholder='Your address' />
            <input className={classes.Input} type='text' name='name' placeholder='Your phone number' />
            <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
          </form>
    )
  
    if (this.state.loading) 
      form = <Spinner /> 
  
    return (
      <div className={classes.ContactData}>
        <h4>Your contact information</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
