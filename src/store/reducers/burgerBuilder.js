import * as actionTypes from '../actions/actionTypes'



const initialState = {
  ingredients: null,
  totalPrice: 4.5,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.8,
  meat: 2.5,
  bacon: 1.7,
  cheese: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      } 
    case actionTypes.SET_INGREDIENTS: 
      return {
        ...state,
        ingredients: {
          salad: action.ingres.salad,
          cheese: action.ingres.cheese,
          meat: action.ingres.meat,
          bacon: action.ingres.bacon
        },
        totalPrice: Object.keys(action.ingres)
          .map(
            ingreName => action.ingres[ingreName] * INGREDIENT_PRICES[ingreName]
          )
          .reduce((sum, el) => sum + el, initialState.totalPrice),
        error: false
      }
    case actionTypes.FETCH_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer