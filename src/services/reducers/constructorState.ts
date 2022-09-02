import {
  ADD_INGREDIENT_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,
  RESET_INGREDIENT_CONSTRUCTOR,
  MOVE_INGREDIENT_CONSTRUCTOR,
  TConstructorActions,
} from "../action/constructorState";
import { TingredientPropType } from "../../utils/types";

type TInitialState = {
  data: Array<TingredientPropType>;
  bun: TingredientPropType | null;
};

const initialState: TInitialState = {
  data: [], //массив из ингредиентов в конструкторе
  bun: null, //булки в конструкторе
};
//редьюсер для конструктора (массив выбранных ингредиентов и тип булки)
export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
        };
      }
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case DELETE_INGREDIENT_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data].filter((item) => item.id !== action.id),
      };
    case RESET_INGREDIENT_CONSTRUCTOR:
      return {
        ...state,
        data: [],
        bun: null,
      };
    case MOVE_INGREDIENT_CONSTRUCTOR: {
      const dataMoving = [...state.data];
      dataMoving.splice(action.hoverIndex, 0, dataMoving.splice(action.dragIndex, 1)[0]);
      return {
        ...state,
        data: dataMoving,
      };
    }
    default:
      return state;
  }
};
