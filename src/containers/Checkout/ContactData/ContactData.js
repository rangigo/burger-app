import React, { Component } from "react"
import { connect } from 'react-redux'

import classes from "./ContactData.css"
import Button from "../../../components/UI/Button/Button"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from '../../../components/UI/Input/Input'
import errorHandler from "../../../hoc/errorHandler/errorHandler"
import * as actions from '../../../store/actions/index'

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Phone number"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ''
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = event => {
    event.preventDefault()

    const formData = {}

    for (let elementId in this.state.orderForm) {
      formData[elementId] = this.state.orderForm[elementId].value
    }

    const order = {
      ingredients: this.props.ingres,
      price: parseFloat(this.props.price.toFixed(2)),
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrder(order, this.props.token)
  }

  checkValidity = (value, rules) => {
    let isValid = true

    if (!rules) return true

    if (rules.required) isValid = value.trim() !== "" && isValid
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid
    return isValid
  }

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedElementForm = { ...updatedOrderForm[inputId] }

    updatedElementForm.value = event.target.value
    updatedElementForm.valid = this.checkValidity(updatedElementForm.value, updatedElementForm.validation) && event.target.validity.valid
    updatedElementForm.touched = true
    updatedElementForm.validationMsg = event.target.validationMessage
    
    updatedOrderForm[inputId] = updatedElementForm

    let formIsValid = true
    for (let key in updatedOrderForm) {
      formIsValid = (updatedOrderForm[key].valid && formIsValid) 
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }

  render() {
    let orderFormArray = []

    for (let key in this.state.orderForm) {
      key === 'email' ? orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
        validationMsg: this.state.orderForm[key].validationMsg
      }) : orderFormArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form>
        {orderFormArray.map(input => (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            invalid={!input.config.valid}
            touched={input.config.touched}
            validationMsg={input.validationMsg}
            valueType={input.id}
            changed={event => this.inputChangeHandler(event, input.id)}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={event => this.orderHandler(event)}
        >
          ORDER
        </Button>
      </form>
    )

    if (this.props.loading) form = <Spinner />

    return (
      <div className={classes.ContactData}>
        <h4>Your contact information</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ingres: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onOrder: (order, token) => dispatch(actions.purchase(order, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios))
