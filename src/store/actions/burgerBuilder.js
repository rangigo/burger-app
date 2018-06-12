import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'

export const addIngredient = ingreName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingreName
  }
}

export const deleteIngredient = ingreName => {
  return {
    type: actionTypes.DELETE_INGREDIENT,
    ingredientName: ingreName
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingres: ingredients
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('ingredients.json')
      .then(response => {
        // const ingredients = response.data
        // const totalPrice = Object.keys(ingredients)
        //   .map(
        //     ingreName => ingredients[ingreName] * INGREDIENT_PRICES[ingreName]
        //   )
        //   .reduce((sum, el) => sum + el, 4.5)
        // console.log(totalPrice)
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(fetchFailed())
      })
  }
}


export const fetchFailed = () =>  {
  return {
    type: actionTypes.FETCH_INGRES_FAILED
  }
}

