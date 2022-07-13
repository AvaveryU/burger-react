//экшены для форм регистрации/входа
import { postRegistration, postEmailUser, resetPassword, postLoginUser, getUser } from "../../utils/api.js";
import { setCookie, getCookie } from "../../utils/utils.js";
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
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const CURRENT_USER_REQUEST = "CURRENT_USER_REQUEST";
export const CURRENT_USER_SUCCESS = "CURRENT_USER_SUCCESS";
export const CURRENT_USER_FAILED = "CURRENT_USER_FAILED";
//мидлвар. На экране /register пользователь вводит данные для регистрации
export function postNewUser(password, name, email) {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    postRegistration(password, name, email)
      .then((result) => {
        setCookie("accessToken", result.accessToken);
        //refreshToken используется для выхода из системы и для получения нового accessToken, если у последнего истёк срок
        localStorage.setItem("accessToken", result.refreshToken);
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
        })
        console.log(error); }
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
        setCookie("accessToken", result.accessToken);
        localStorage.setItem("accessToken", result.refreshToken);
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
        console.log(error);
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
        dispatch({
          type: CURRENT_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          dispatch(getUserInfo());
        } else {
          dispatch({
            type: CURRENT_USER_FAILED,
            payload: error.message,
          });
        }
        console.log(error);
      });
  };
}
