import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4.5,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.8,
  meat: 2.5,
  bacon: 1.7,
  cheese: 1
}

const addIngredient = (state, action) => {
  const updatedState = {
    ingredients: updateObject(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState)
}

const deleteIngredient = (state, action) => {
  const updatedObj = {
    ingredients: updateObject(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }),
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedObj)
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingres.salad,
      cheese: action.ingres.cheese,
      meat: action.ingres.meat,
      bacon: action.ingres.bacon
    },
    totalPrice: Object.keys(action.ingres)
      .map(ingreName => action.ingres[ingreName] * INGREDIENT_PRICES[ingreName])
      .reduce((sum, el) => sum + el, initialState.totalPrice),
    error: false,
    building: false
  })
}

const fetchFailed = (state, action) => {
  return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.DELETE_INGREDIENT:
      return deleteIngredient(state, action)
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actionTypes.FETCH_INGRES_FAILED:
      return fetchFailed(state, action)
    default:
      return state
  }
}

export default reducer
