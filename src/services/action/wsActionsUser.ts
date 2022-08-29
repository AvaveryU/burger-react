import { TWsOrdersDetails, TOrder } from "../../utils/types";
export const WS_AUTH_USER_START: "WS_AUTH_USER_START" = "WS_AUTH_USER_START";
export const WS_AUTH_USER_SUCCESS: "WS_AUTH_USER_SUCCESS" = "WS_AUTH_USER_SUCCESS";
export const WS_AUTH_USER_CLOSED: "WS_AUTH_USER_CLOSED" = "WS_AUTH_USER_CLOSED";
export const WS_AUTH_USER_ERROR: "WS_AUTH_USER_ERROR" = "WS_AUTH_USER_ERROR";
export const WS_AUTH_USER_GET_ORDER: "WS_AUTH_USER_GET_ORDER" = "WS_AUTH_USER_GET_ORDER";
export const WS_AUTH_USER_CLOSE: "WS_AUTH_USER_CLOSE" = "WS_AUTH_USER_CLOSE";

export const WS_AUTH_USER_SEND_ORDER: "WS_AUTH_USER_SEND_ORDER" = "WS_AUTH_USER_SEND_ORDER";

export type TWsAuthActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IGetWsConnection
  | IWsConnectionClose
  | IWsSendOrder;

interface IWsConnectionStart {
  readonly type: typeof WS_AUTH_USER_START;
  readonly payload: string;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_AUTH_USER_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_AUTH_USER_ERROR;
  readonly payload: string;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_AUTH_USER_CLOSED;
}
interface IGetWsConnection {
  readonly type: typeof WS_AUTH_USER_GET_ORDER;
  readonly payload: TWsOrdersDetails;
}
interface IWsConnectionClose {
  readonly type: typeof WS_AUTH_USER_CLOSE;
}
interface IWsSendOrder {
  readonly type: typeof WS_AUTH_USER_SEND_ORDER;
  readonly payload: TOrder;
}
//начало соединения
export const wsConnectionStartUser = (url: string): IWsConnectionStart => {
  return {
    type: WS_AUTH_USER_START,
    payload: url,
  };
};
export const wsCloseConnectionUser = (): IWsConnectionClosed => {
  return {
    type: WS_AUTH_USER_CLOSED,
  };
};
export const wsSendOrderUser = (order: TOrder): IWsSendOrder => {
  return {
    type: WS_AUTH_USER_SEND_ORDER,
    payload: order,
  };
};
