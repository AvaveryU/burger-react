import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, TOrderActions } from "../action/order";

type TInitialState = {
  order: {
    number: number | null;
  };
  isLoading: boolean;
  error: boolean | string;
};
const initialState: TInitialState = {
  order: {
    number: null,
  },
  isLoading: false,
  error: false,
};

//редьюсер заказа
export const orderReducer = (state = initialState, action: TOrderActions): TInitialState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        order: { number: action.payload },
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
        order: { number: null },
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
