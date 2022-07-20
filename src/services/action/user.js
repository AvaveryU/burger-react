import { postRegistration, postEmailUser, resetPassword, postLoginUser, getUser, postToken, patchUser, getCookie } from "../../utils/api.js";
import { setCookie } from "../../utils/utils";
//экшены для регистрации
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";
//экшены для смены пароля
export const CREATE_RECOVERY_PASSWORD_REQUEST = "CREATE_RECOVERY_PASSWORD_REQUEST";
export const CREATE_RECOVERY_PASSWORD_SUCCESS = "CREATE_RECOVERY_PASSWORD_SUCCESS";
export const CREATE_RECOVERY_PASSWORD_FAILED = "CREATE_RECOVERY_PASSWORD_FAILED";
//экшены для подтверждении смены пароля
export const SAVE_PASSWORD_REQUEST = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_FAILED = "SAVE_PASSWORD_FAILED";
//экшены для входа пользователем в ЛК
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
//экшены для подтверждения текущего пользователя
export const CURRENT_USER_REQUEST = "CURRENT_USER_REQUEST";
export const CURRENT_USER_SUCCESS = "CURRENT_USER_SUCCESS";
export const CURRENT_USER_FAILED = "CURRENT_USER_FAILED";
//экшены для обновления токена
export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";
//экшены для изменения инфо о пользователе (в /profile)
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

//мидлвар. На экране /register пользователь вводит данные для регистрации
export function postNewUser(password, name, email) {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    postRegistration(password, name, email)
      .then((result) => {
        setCookie("accessToken", result.accessToken.split("Bearer ")[1]); //отделяем схему авторизации
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: result,
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
          payload: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: CREATE_RECOVERY_PASSWORD_FAILED,
          payload: error.message,
        });
      });
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
          payload: result,
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
//мидлвар авторизации. На экране /login пользователь вводит пароль, email и нажимает кнопку "Войти"
export function loginUser(password, email) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    postLoginUser(password, email)
      .then((result) => {
        setCookie("accessToken", result.accessToken.split("Bearer ")[1]); //отделяем схему авторизации
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: error.message,
        });
      });
  };
}
//мидлвар для обновления токена
export function refreshToken() {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    postToken()
      .then((result) => {
        console.log("токен обновлен");
        setCookie("accessToken", result.accessToken.split("Bearer ")[1]); //отделяем схему авторизации
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        console.log("токен не обновлен");
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          payload: error.message,
        });
      });
  };
}
//мидлвар. получить инфо о пользователе
export function getUserInfo() {
  return (dispatch) => {
    dispatch({
      type: CURRENT_USER_REQUEST,
    });
    getUser()
      .then((result) => {
        if (result.success) {
          console.log("инфо обновлено");
          dispatch({
            type: CURRENT_USER_SUCCESS,
            payload: result,
          });
        }
      })
      .catch((error) => {
        if (error.message === "Token is invalid") {
          dispatch(refreshToken());
          dispatch(getUserInfo());
        } else {
          console.log("инфо о пользователе не обновлено");
          dispatch({
            type: CURRENT_USER_FAILED,
            payload: error.message,
          });
        }
      });
  };
}
//мидлвар для обновления инфо о пользователе
export function refreshUserInfo(password, email, name) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    patchUser(password, email, name)
      .then((result) => {
        if (result.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: result,
          });
        }
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
        if (localStorage.getItem("refreshToken")) {
          dispatch(refreshToken());
          dispatch(refreshUserInfo(password, email, name));
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
            payload: error.message,
          });
        }
      });
  };
}
