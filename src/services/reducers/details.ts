import {
  OPEN_ORDER_MODAL,
  OPEN_INGREDIENT_MODAL,
  CLOSE_MODAL,
  OPEN_ORDER_USERS_MODAL,
  TDetailsModalActions,
} from "../action/details";
type TInitialState = {
  isOrderDetailsOpened: boolean;
  isIngredientDetailsOpened: boolean;
  isOrderUsersOpened: boolean;
};
const initialState: TInitialState = {
  isOrderDetailsOpened: false,
  isIngredientDetailsOpened: false,
  isOrderUsersOpened: false,
};
//редьюсер для модальных окон
export const detailsReducer = (state = initialState, action: TDetailsModalActions) => {
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
