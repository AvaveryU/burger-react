import { BURGER_API_WSS_FEED } from "../../utils/utils";
//экшены для работы с webSocket
export const WS_CONNECTION_START = "WS_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS"; //при успешном соединении
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR"; //в случае ошибки соединения
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED"; //при закрытии соединения
export const WS_GET_MESSAGE = "WS_GET_MESSAGE"; //при получении сообщения с заказами ыот сервера
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";

//начало соединения
export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
    payload: BURGER_API_WSS_FEED,
  };
};
export const wsCloseConnection = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};
