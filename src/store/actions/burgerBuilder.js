import * as actionTypes from './actionTypes'

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

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS
})


export const fetchFailed = () =>  {
  return {
    type: actionTypes.FETCH_INGRES_FAILED
  }
}

