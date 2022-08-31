import {
  WS_AUTH_USER_SUCCESS,
  WS_AUTH_USER_CLOSED,
  WS_AUTH_USER_ERROR,
  WS_AUTH_USER_GET_ORDER,
  TWsAuthActions,
} from "../action/wsActionsUser";
import { TOrder } from "../../utils/types";
type TInitialState = {
  wsConnected: boolean; //статус соединения WebSocket
  orders: Array<TOrder>; //заказы пользователя
  error: null | string; //ошибка от ws
};
const initialState: TInitialState = {
  wsConnected: false, //статус соединения WebSocket
  orders: [], //заказы пользователя
  error: null, //ошибка от ws
};

export const wsAuthReducer = (state = initialState, action: TWsAuthActions) => {
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
        orders: action.payload.orders,
      };
    default: {
      return state;
    }
  }
};
