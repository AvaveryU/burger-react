import { postEmailUser, resetPassword, postLoginUser } from "../../utils/api.js";
//экшены для форм восстановления пароля
//запрос на восстановление пароля (при нажатии на 'восстановить')
export const CREATE_RECOVERY_PASSWORD_REQUEST = "CREATE_RECOVERY_PASSWORD_REQUEST";
export const CREATE_RECOVERY_PASSWORD_SUCCESS = "CREATE_RECOVERY_PASSWORD_SUCCESS";
export const CREATE_RECOVERY_PASSWORD_FAILED = "CREATE_RECOVERY_PASSWORD_FAILED";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_TOKEN = "SET_TOKEN";
export const SAVE_PASSWORD_REQUEST = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_FAILED = "SAVE_PASSWORD_FAILED";

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
          payload: result.login.email,
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
//action creator для восстановления пароля по email
export function setEmail(data) {
  return {
    type: SET_EMAIL,
    payload: { email: data },
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
          payload: {password: result.login.password, token: result.login.token,},
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
//action creator для установки пароля
export function setPassword(data) {
  return {
    type: SET_PASSWORD,
    payload: { password: data },
  };
}
//action creator для установки токена
export function setToken(data) {
  return {
    type: SET_TOKEN,
    payload: { token: data },
  };
}


export const LOGIN_USER_EMAIL = "LOGIN_USER_EMAIL";
export const LOGIN_USER_PASSWORD = "LOGIN_USER_PASSWORD";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export function loginPassword(data) {
  return {
    type: LOGIN_USER_PASSWORD,
    payload: { password: data },
  };
}
export function loginEmail(data) {
  return {
    type: LOGIN_USER_EMAIL,
    payload: { email: data },
  };
}
export function loginUser(password, email) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    postLoginUser(password, email)
      .then((result) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {password: result.login.password, email: result.login.email,},
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