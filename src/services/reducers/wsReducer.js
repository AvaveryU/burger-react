import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "../action/wsActions";

const initialState = {
  wsConnected: false, //статус соединения WebSocket
  orders: [], //входящие заказы
  error: null, //ошибка от ws
  total: null,
  totalToday: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_MESSAGE: //с сервера возвращаются данные
      return {
        ...state,
        orders: action.payload.data.orders,
        total: action.payload.data.total,
        totalToday: action.payload.data.totalToday,
      };
    default: {
      return state;
    }
  }
};
