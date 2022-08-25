import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, TOrderActions } from "../action/order";
import { TOrderDetails } from "../../utils/types";

type TInitialState = {
  order: {
    number: number;
  };
  isLoading: boolean;
  error: boolean;
};
const initialState: TInitialState = {
  order: {
    number: 0,
  },
  isLoading: false,
  error: false,
};

//редьюсер заказа
export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        order: action.payload,
        isLoading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: { ...state.order, number: action.payload },
        isLoading: false,
        error: false,
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        order: {},
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
