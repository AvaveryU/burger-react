import INFO from "./data.json";
import { getCookie } from "./utils.js";

export function checkResponse(response) {
  return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
}
// функция для получения данных с сервера
export const getIngredients = async () => {
  const urlIngredients = "ingredients";
  const response = await fetch(INFO.baseURL + urlIngredients, {
    method: "GET",
    headers: INFO.headers,
  });
  return checkResponse(response);
};
// функция для отправки данных на сервер о заказе
export const postOrderDetails = async (data) => {
  const urlOrders = "orders";
  const response = await fetch(INFO.baseURL + urlOrders, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ ingredients: data }),
  });
  return checkResponse(response);
};
// функция для отправки данных на сервер о e-mail для восстановления пароля (page /forgot-password)
export const postEmailUser = async (data) => {
  const urlPasswordForgot = "password-reset";
  const response = await fetch(INFO.baseURL + urlPasswordForgot, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: data }),
  });
  return checkResponse(response);
};
// функция для отправки данных на сервер с паролем и токеном для восстановления пароля (page /reset-password)
export const resetPassword = async (password, token) => {
  const urlPasswordReset = "password-reset/reset";
  const response = await fetch(INFO.baseURL + urlPasswordReset, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ password: password, token: token }),
  });
  return checkResponse(response);
};
// функция для регистрации (page /register)
export const postRegistration = async (password, name, email) => {
  const urlRegister = "auth/register";
  const response = await fetch(INFO.baseURL + urlRegister, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
  return checkResponse(response);
};
// функция для авторизации (page /login)
export const postLoginUser = async (password, email) => {
  const urlLogin = "auth/login";
  const response = await fetch(INFO.baseURL + urlLogin, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: email, password: password }),
  });
  return checkResponse(response);
};
// функция для получения данных о профиле
export const getUser = async () => {
  const urlUser = "auth/user";
  const response = await fetch(INFO.baseURL + urlUser, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
  return checkResponse(response);
};
// функция для обновления данных в пользователе
export const patchUser = async (password, email, name) => {
  const urlUser = "auth/user";
  const response = await fetch(INFO.baseURL + urlUser, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
  return checkResponse(response);
};
// функция для выхода из профиля
export const postLogoutUser = async () => {
  const urlLogout = "auth/logout";
  const response = await fetch(INFO.baseURL + urlLogout, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
  });
  return checkResponse(response);
};
// функция для обновления токена
export const postToken = async () => {
  const urlToken = "auth/token";
  const response = await fetch(INFO.baseURL + urlToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("refreshToken"),
    },
    body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
  });
  return checkResponse(response);
};
