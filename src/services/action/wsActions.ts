import { BURGER_API_WSS_FEED } from "../../utils/utils";
import { TWsOrdersDetails } from "../../utils/types";
//экшены для работы с webSocket
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS"; //при успешном соединении
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR"; //в случае ошибки соединения
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED"; //при закрытии соединения
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE"; //при получении сообщения с заказами ыот сервера
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IGetWsConnection
  | IWsConnectionClose;

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IGetWsConnection {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWsOrdersDetails;
}
interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
//начало соединения
export const wsConnectionStart = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: BURGER_API_WSS_FEED,
  };
};
export const wsCloseConnection = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};
