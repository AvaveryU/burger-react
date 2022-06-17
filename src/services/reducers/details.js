import { OPEN_ORDER_MODAL, OPEN_INGREDIENT_MODAL, CLOSE_MODAL } from "../action/details.js";
const initialState = {
  ingredientInModal: {},
  isOrderDetailsOpened: false,
  isIngredientDetailsOpened: false,
};
//редьюсер деталей текущего просматриваемого ингредиента
export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        isOrderDetailsOpened: true,
        isIngredientDetailsOpened: false,
      };
    case OPEN_INGREDIENT_MODAL:
      return {
        ...state,
        ingredientInModal: action.payload,
        isOrderDetailsOpened: false,
        isIngredientDetailsOpened: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOrderDetailsOpened: false,
        isIngredientDetailsOpened: false,
      };
    default:
      return state;
  }
};
