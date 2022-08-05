import { BURGER_API_WSS_ORDERS } from "../../utils/utils";

export const WS_AUTH_USER_START = "WS_AUTH_USER_START";
export const WS_AUTH_USER_SUCCESS = "WS_AUTH_USER_SUCCESS";
export const WS_AUTH_USER_CLOSED = "WS_AUTH_USER_CLOSED";
export const WS_AUTH_USER_ERROR = "WS_AUTH_USER_ERROR";
export const WS_AUTH_USER_GET_ORDER = "WS_AUTH_USER_GET_ORDER";
export const WS_AUTH_USER_CLOSE = "WS_AUTH_USER_CLOSE";

export const WS_AUTH_USER_SEND_ORDER = "WS_AUTH_USER_SEND_ORDER";

//начало соединения
export const wsConnectionStartUser = (accessToken) => {
  return {
    type: WS_AUTH_USER_START,
    payload: `${BURGER_API_WSS_ORDERS}?token=${accessToken}`,
  };
};
export const wsCloseConnectionUser = () => {
  return {
    type: WS_AUTH_USER_CLOSED,
  };
};
export const wsSendOrderUser = (order) => {
  return {
    type: WS_AUTH_USER_SEND_ORDER,
    payload: order,
  };
};
