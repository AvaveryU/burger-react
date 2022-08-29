import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsActions,
} from "../action/wsActions";
import { TWsOrdersDetails } from "../../utils/types";

type TInitialState = {
  wsConnected: boolean; //статус соединения WebSocket
  orders: TWsOrdersDetails[]; // все заказы с сервера
  error: null | string; //ошибка от ws
  total: null | string;
  totalToday: null | string;
};
const initialState: TInitialState = {
  wsConnected: false, //статус соединения WebSocket
  orders: [], // все заказы с сервера
  error: null, //ошибка от ws
  total: null,
  totalToday: null,
};

export const wsReducer = (state = initialState, action: TWsActions) => {
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
    case WS_GET_MESSAGE: //с сервера возвращаются данные о всех заказах
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
