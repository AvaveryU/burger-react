import INFO from "./data.json";
import { getCookie } from "./utils";
import {
  TOrderDetails,
  TUserEmailForgottenOrLogout,
  TUserEmailReset,
  TUserRegistration,
  TUser,
  TRefreshToken,
  TIngredientDetails,
} from "./types";

export function checkResponse<T>(response: Response): Promise<T> {
  return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
}
// функция для получения данных с сервера
export const getIngredients = async () => {
  const urlIngredients = "ingredients";
  const response = await fetch(INFO.baseURL + urlIngredients, {
    method: "GET",
    headers: INFO.headers,
  });
  return checkResponse<TIngredientDetails>(response);
};
// функция для отправки данных на сервер о заказе
export const postOrderDetails = async (data: Array<string>) => {
  const urlOrders = "orders";
  const response = await fetch(INFO.baseURL + urlOrders, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ ingredients: data }),
  });
  return checkResponse<TOrderDetails>(response);
};
// функция для отправки данных на сервер о e-mail для восстановления пароля (page /forgot-password)
export const postEmailUser = async (data: string) => {
  const urlPasswordForgot = "password-reset";
  const response = await fetch(INFO.baseURL + urlPasswordForgot, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: data }),
  });
  return checkResponse<TUserEmailForgottenOrLogout>(response);
};
// функция для отправки данных на сервер с паролем и токеном для восстановления пароля (page /reset-password)
export const resetPassword = async (password: string, token: string) => {
  const urlPasswordReset = "password-reset/reset";
  const response = await fetch(INFO.baseURL + urlPasswordReset, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ password: password, token: token }),
  });
  return checkResponse<TUserEmailReset>(response);
};
// функция для регистрации (page /register)
export const postRegistration = async (password: string, name: string, email: string) => {
  const urlRegister = "auth/register";
  const response = await fetch(INFO.baseURL + urlRegister, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
  return checkResponse<TUserRegistration>(response);
};
// функция для авторизации (page /login)
export const postLoginUser = async (password: string, email: string) => {
  const urlLogin = "auth/login";
  const response = await fetch(INFO.baseURL + urlLogin, {
    method: "POST",
    headers: INFO.headers,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email: email, password: password }),
  });
  return checkResponse<TUserRegistration>(response);
};
// функция для получения данных о профиле
export const getUser = async () => {
  const urlUser = "auth/user";
  const response = await fetch(INFO.baseURL + urlUser, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  return checkResponse<TUser>(response);
};
// функция для обновления данных в пользователе
export const patchUser = async (password: string, email: string, name: string) => {
  const urlUser = "auth/user";
  const response = await fetch(INFO.baseURL + urlUser, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ email: email, name: name, password: password }),
  });
  return checkResponse<TUser>(response);
};
// функция для выхода из профиля
export const postLogoutUser = async () => {
  const urlLogout = "auth/logout";
  const response = await fetch(INFO.baseURL + urlLogout, {
    method: "POST",
    headers: INFO.headers,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
  return checkResponse<TUserEmailForgottenOrLogout>(response);
};
// функция для обновления токена
export const postToken = async () => {
  const urlToken = "auth/token";
  const response = await fetch(INFO.baseURL + urlToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
  return checkResponse<TRefreshToken>(response);
};
