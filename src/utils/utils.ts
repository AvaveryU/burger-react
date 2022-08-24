import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSE,
} from "../services/action/wsActions";
import {
  WS_AUTH_USER_START,
  WS_AUTH_USER_CLOSE,
  WS_AUTH_USER_SUCCESS,
  WS_AUTH_USER_CLOSED,
  WS_AUTH_USER_ERROR,
  WS_AUTH_USER_GET_ORDER,
  WS_AUTH_USER_SEND_ORDER,
} from "../services/action/wsActionsUser";
import { IwsActions, IwsActionsAuthUser } from "./types";

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: Record<string, string | number | boolean | Date>) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
//эндпоинты webSocket
export const BURGER_API_WSS_ORDERS = "wss://norma.nomoreparties.space/orders";
export const BURGER_API_WSS_FEED = "wss://norma.nomoreparties.space/orders/all";
//объект с экшенами
//!как типизировать лучше?
export const wsActions: IwsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
//объект с экшенами
//!как типизировать лучше?
export const wsActionsAuthUser: IwsActionsAuthUser = {
  wsInit: WS_AUTH_USER_START,
  wsClose: WS_AUTH_USER_CLOSE,
  onOpen: WS_AUTH_USER_SUCCESS,
  onClose: WS_AUTH_USER_CLOSED,
  onError: WS_AUTH_USER_ERROR,
  onMessage: WS_AUTH_USER_GET_ORDER,
  wsSendData: WS_AUTH_USER_SEND_ORDER,
};

export const formatDate = (date: string) => {
  const today = new Date();
  const todayISOstring = today.toISOString();
  const slicedTodayISOString = todayISOstring.slice(0, 10);
  const slicedOrderDateISOString = date?.slice(0, 10);
  const parsedToday = Date.parse(slicedTodayISOString);
  const parsedOrderDate = Date.parse(slicedOrderDateISOString);

  const daysDiff = (parsedToday - parsedOrderDate) / (1000 * 60 * 60 * 24);

  return daysDiff;
};

const formatDaysDiff = (num: number) => {
  if (num === 0) return "Сегодня";
  if (num === 1) return "Вчера";
  return num <= 4 ? `${num} дня назад` : `${num} дней назад`;
};

export const getTimeStampString = (date: string) => {
  const dateObj = new Date(date);
  const daysDiff = formatDate(date);
  const formatedDaysDiff = formatDaysDiff(daysDiff);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const hoursToString = hours <= 9 ? `0${hours}` : `${hours}`;
  const minutesToString = minutes <= 9 ? `0${minutes}` : `${minutes}`;
  const timeZone = Math.abs(dateObj.getTimezoneOffset() / 60);

  return `${formatedDaysDiff}, ${hoursToString}:${minutesToString} i-GMT+${timeZone}`;
};
//статус заказа
export const getOrderStatus = (status: string) => {
  switch (status) {
    case "done": {
      return "Выполнен";
    }
    case "pending": {
      return "Готовится";
    }
    case "created": {
      return "Создан";
    }
    default: {
      return "";
    }
  }
};
