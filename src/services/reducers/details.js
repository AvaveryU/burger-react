import { OPEN_ORDER_MODAL, OPEN_INGREDIENT_MODAL, CLOSE_MODAL, OPEN_ORDER_USERS_MODAL } from "../action/details.js";
const initialState = {
  isOrderDetailsOpened: false,
  isIngredientDetailsOpened: false,
  isOrderUsersOpened: false,
};
//редьюсер для модальных окон
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
        isOrderDetailsOpened: false,
        isIngredientDetailsOpened: true,
      };
    case OPEN_ORDER_USERS_MODAL:
      return {
        ...state,
        isOrderDetailsOpened: false,
        isIngredientDetailsOpened: false,
        isOrderUsersOpened: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOrderDetailsOpened: false,
        isIngredientDetailsOpened: false,
        isOrderUsersOpened: false,
      };
    default:
      return state;
  }
};
