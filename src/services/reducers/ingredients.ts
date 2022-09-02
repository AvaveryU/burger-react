import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TIngredientsActions,
} from "../action/ingredients";
import { TingredientPropType } from "../../utils/types";

type TInitialState = {
  ingredients: Array<TingredientPropType>;
  isLoading: boolean;
  error: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  isLoading: false,
  error: false,
};
//редьюсер массива с ингредиентами
export const ingredientListReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        error: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
