import { ADD_INGREDIENT_CONSTRUCTOR, DELETE_INGREDIENT_CONSTRUCTOR, ADD_INGREDIENT_BUN_CONSTRUCTOR } from "../action/constructor.js";

const initialState = {
  data: [],
  bun: null,
};
//редьюсер для конструктора (массив выбранных ингредиентов и тип булки)
export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data, action.payload.item],
      };
      case ADD_INGREDIENT_BUN_CONSTRUCTOR:
      return {
        ...state,
        bun: action.payload.item,
      };
    case DELETE_INGREDIENT_CONSTRUCTOR:
      return {
        ...state,
        data: action.payload.filter((item) => item._id !== action.uId),
      };
    default:
      return state;
  }
};
