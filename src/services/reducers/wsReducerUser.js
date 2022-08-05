import {
  WS_AUTH_USER_SUCCESS,
  WS_AUTH_USER_CLOSED,
  WS_AUTH_USER_ERROR,
  WS_AUTH_USER_GET_ORDER,
} from "../action/wsActionsUser";

const initialState = {
  wsConnected: false, //статус соединения WebSocket
  orders: [], //заказы пользователя
  error: null, //ошибка от ws
};

export const wsAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_AUTH_USER_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    case WS_AUTH_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case WS_AUTH_USER_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_AUTH_USER_GET_ORDER: //с сервера возвращаются данные о заказе
      return {
        ...state,
        orders: action.payload.data.orders,
      };
    default: {
      return state;
    }
  }
};
