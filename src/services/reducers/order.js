import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED } from "../action/order.js";

const initialState = {
  order: {
    number: 0,
  },
  isLoading: false,
  error: null,
};
//редьюсер заказа
export const orderReducer = (state = initialState, action) => {
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
        error: null,
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
