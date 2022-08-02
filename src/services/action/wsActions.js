import { BURGER_API_WSS_FEED } from "../../utils/utils";
//экшены для работы с webSocket
export const WS_CONNECTION_START = "WS_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS"; //при успешном соединении
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR"; //в случае ошибки соединения
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED"; //при закрытии соединения
export const WS_GET_MESSAGE = "WS_GET_MESSAGE"; //при получении сообщения с заказами ыот сервера
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";

export const WS_AUTH_USER_START = "WS_AUTH_USER_START";
export const WS_AUTH_USER_SUCCESS = "WS_AUTH_USER_SUCCESS";
export const WS_AUTH_USER_CLOSED = "WS_AUTH_USER_CLOSED";
export const WS_AUTH_USER_ERROR = "WS_AUTH_USER_ERROR";
export const WS_AUTH_USER_GET_ORDER = "WS_AUTH_USER_GET_ORDER";
export const WS_AUTH_USER_CLOSE = "WS_AUTH_USER_CLOSE";

export const WS_AUTH_USER_SEND_ORDER = "WS_AUTH_USER_SEND_ORDER";

//начало соединения
export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
    payload: BURGER_API_WSS_FEED,
  };
};
// //при успешном соединении
export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};
// //в случае ошибки соединения
// export const wsConnectionError = () => {
//   return {
//     type: WS_CONNECTION_ERROR,
//   };
// };
// //при закрытии соединения
// export const wsCloseConnection = () => {
//   return {
//     type: WS_CONNECTION_CLOSE,
//   };
// };
export const wsCloseConnection = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};
// //при получении сообщения с заказами от сервера
// export const wsGetMessage = (order) => {
//   return {
//     type: WS_GET_MESSAGE,
//     payload: order,
//   };
// };
// //для отправки сообщений на сервер
// export const wsSendMessage = (order) => {
//   return {
//     type: WS_SEND_MESSAGE,
//     payload: order,
//   };
// };
// export const wsAuthSuccess = () => {
//   return {
//     type: WS_AUTH_USER_SUCCESS,
//   };
// };
// export const wsAuthError = () => {
//   return {
//     type: WS_AUTH_USER_ERROR,
//   };
// };
// export const wsAuthClosed = () => {
//   return {
//     type: WS_AUTH_USER_CLOSED,
//   };
// };
// export const wsAuthGetOrder = (message) => {
//   return {
//     type: WS_AUTH_USER_GET_ORDER,
//     payload: message,
//   };
// };
// export const wsAuthSendOrder = (message) => {
//   return {
//     type: WS_AUTH_USER_SEND_ORDER,
//     payload: message,
//   };
// };
