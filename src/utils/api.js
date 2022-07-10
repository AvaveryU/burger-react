import INFO from "./data.json";
import { getCookie } from "./utils.js";

// проверка ответа от сервера
// export function checkResponse(response) {
//   if (response.ok) {
//     return response.json();
//   }
//   throw new Error("Ошибка при взаимодействии с сервером!");
// }
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
export const postRegistration = async (email, password, name) => {
  const urlRegister = "auth/register";
  const response = await fetch(INFO.baseURL + urlRegister, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: email, password: password, name: name }),
  });
  return checkResponse(response);
};
// функция для авторизации (page /login)
export const postLoginUser = async (email, password) => {
  const urlLogin = "auth/login";
  const response = await fetch(INFO.baseURL + urlLogin, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ email: email, password: password}),
  });
  return checkResponse(response);
};
export const getUserRequest = async () => {
const urlUser = "auth/user";
const response =  await fetch(INFO.baseURL + urlUser, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  return checkResponse(response);
};