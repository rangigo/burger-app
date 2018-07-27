import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import classes from './Auth.css'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/'
import Spinner from '../../components/UI/Spinner/Spinner'

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirPath !== '/') {
      this.props.onSetAuthRedirPath()
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true

    if (!rules) return true

    if (rules.required) isValid = value.trim() !== '' && isValid
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid
    return isValid
  }

  inputChangeHandler = (e, ctrlName) => {
    const updatedCtrls = {
      ...this.state.controls,
      [ctrlName]: {
        ...this.state.controls[ctrlName],
        value: e.target.value,
        valid:
          this.checkValidity(
            e.target.value,
            this.state.controls[ctrlName].validation
          ) && e.target.validity.valid,
        touched: true,
        validationMsg: e.target.validationMessage
      }
    }

    this.setState({ controls: updatedCtrls })
  }

  submitForm = e => {
    e.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    )
  }

  switchAuthModeHandler = () => {
    this.setState({
      isSignUp: !this.state.isSignUp
    })
  }

  render() {
    let controls = []

    for (let key in this.state.controls) {
      if (key === 'email')
        controls.push({
          id: key,
          config: this.state.controls[key],
          validationMsg: this.state.controls[key].validationMsg
        })
      else
        controls.push({
          id: key,
          config: this.state.controls[key]
        })
    }

    const form = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.submitForm}>
        {controls.map(input => (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            validationMsg={input.validationMsg}
            value={input.config.value}
            invalid={!input.config.valid}
            touched={input.config.touched}
            valueType={input.id}
            changed={event => this.inputChangeHandler(event, input.id)}
          />
        ))}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    )

    const errMsg = this.props.error ? (<p style={{color: 'red', textTransform: 'capitalize'}}>{this.props.error.message.replace(/_/g, ' ').toLowerCase()}</p>) : null

    const authRedir = this.props.isAuth ? (<Redirect to={this.props.authRedirPath} />) : null
    return (
      <div className={classes.Auth}>
        {authRedir}
        {errMsg}
        {form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}{' '}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirPath: state.auth.authRedirPath
})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirPath: () => dispatch(actions.setAuthRedirPath('/'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
