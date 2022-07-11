//экшены для форм регистрации/входа
import { postRegistration, postEmailUser, resetPassword, postLoginUser } from "../../utils/api.js";
//запрос на регистрацию (при нажатии на 'зарегистрироваться')
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";
export const CREATE_RECOVERY_PASSWORD_REQUEST = "CREATE_RECOVERY_PASSWORD_REQUEST";
export const CREATE_RECOVERY_PASSWORD_SUCCESS = "CREATE_RECOVERY_PASSWORD_SUCCESS";
export const CREATE_RECOVERY_PASSWORD_FAILED = "CREATE_RECOVERY_PASSWORD_FAILED";
export const SAVE_PASSWORD_REQUEST = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_FAILED = "SAVE_PASSWORD_FAILED";
export const LOGIN_USER_EMAIL = "LOGIN_USER_EMAIL";
export const LOGIN_USER_PASSWORD = "LOGIN_USER_PASSWORD";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_TOKEN = "SET_TOKEN";
//мидлвар. На экране /register пользователь вводит данные для регистрации
export function postNewUser(password, name, email) {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    postRegistration(password, name, email)
      .then((result) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) =>
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: error.message,
        })
      );
  };
}
//action creator для установки пароля
export function setPassword(data) {
  return {
    type: SET_PASSWORD,
    payload: { password: data },
  };
}
//action creator для установки имени
export function setName(data) {
  return {
    type: SET_NAME,
    payload: { name: data },
  };
}
//action creator для установки email
export function setEmail(data) {
  return {
    type: SET_EMAIL,
    payload: { email: data },
  };
}
//мидлвар. На экране /forgot-password пользователь вводит адрес электронной почты и нажимает кнопку «Восстановить»
export function postEmail(data) {
  return (dispatch) => {
    dispatch({
      type: CREATE_RECOVERY_PASSWORD_REQUEST,
    });
    postEmailUser(data)
      .then((result) => {
        dispatch({
          type: CREATE_RECOVERY_PASSWORD_SUCCESS,
          payload: result.user.user.email,
        });
      })
      .catch((error) =>
        dispatch({
          type: CREATE_RECOVERY_PASSWORD_FAILED,
          payload: error.message,
        })
      );
  };
}
//мидлвар. На экране /reset-password пользователь вводит пароль и код и нажимает кнопку "Сохранить"
export function savePassword(password, token) {
  return (dispatch) => {
    dispatch({
      type: SAVE_PASSWORD_REQUEST,
    });
    resetPassword(password, token)
      .then((result) => {
        dispatch({
          type: SAVE_PASSWORD_SUCCESS,
          payload: {password: result.user.password, token: result.user.token},
        });
      })
      .catch((error) =>
        dispatch({
          type: SAVE_PASSWORD_FAILED,
          payload: error.message,
        })
      );
  };
}
//action creator для установки токена
export function setToken(data) {
  return {
    type: SET_TOKEN,
    payload: { token: data },
  };
}
//action creator для входа по паролю
export function loginPassword(data) {
  return {
    type: LOGIN_USER_PASSWORD,
    payload: { password: data },
  };
}
//action creator для входа по email
export function loginEmail(data) {
  return {
    type: LOGIN_USER_EMAIL,
    payload: { email: data },
  };
}
//мидлвар. На экране /login пользователь вводит пароль, email и нажимает кнопку "Войти"
export function loginUser(password, email) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    postLoginUser(password, email)
      .then((result) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {password: result.user.password, email: result.user.user.email,},
        });
      })
      .catch((error) =>
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: error.message,
        })
      );
  };
}