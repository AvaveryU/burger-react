import {
  postRegistration,
  postEmailUser,
  resetPassword,
  postLoginUser,
  postLogoutUser,
  getUser,
  postToken,
  patchUser,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";
import {
  TUserRegistration,
  TUserEmailForgottenOrLogout,
  TUserEmailReset,
  TRefreshToken,
  TUser,
} from "../../utils/types";
import { AppThunk } from "../store";
//экшены для регистрации
export const USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST" = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS" = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED: "USER_REGISTER_FAILED" = "USER_REGISTER_FAILED";
//экшены для смены пароля
export const CREATE_RECOVERY_PASSWORD_REQUEST: "CREATE_RECOVERY_PASSWORD_REQUEST" = "CREATE_RECOVERY_PASSWORD_REQUEST";
export const CREATE_RECOVERY_PASSWORD_SUCCESS: "CREATE_RECOVERY_PASSWORD_SUCCESS" = "CREATE_RECOVERY_PASSWORD_SUCCESS";
export const CREATE_RECOVERY_PASSWORD_FAILED: "CREATE_RECOVERY_PASSWORD_FAILED" = "CREATE_RECOVERY_PASSWORD_FAILED";
//экшены для подтверждении смены пароля
export const SAVE_PASSWORD_REQUEST: "SAVE_PASSWORD_REQUEST" = "SAVE_PASSWORD_REQUEST";
export const SAVE_PASSWORD_SUCCESS: "SAVE_PASSWORD_SUCCESS" = "SAVE_PASSWORD_SUCCESS";
export const SAVE_PASSWORD_FAILED: "SAVE_PASSWORD_FAILED" = "SAVE_PASSWORD_FAILED";
//экшены для входа пользователем в ЛК
export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED";
//экшены для подтверждения текущего пользователя
export const CURRENT_USER_REQUEST: "CURRENT_USER_REQUEST" = "CURRENT_USER_REQUEST";
export const CURRENT_USER_SUCCESS: "CURRENT_USER_SUCCESS" = "CURRENT_USER_SUCCESS";
export const CURRENT_USER_FAILED: "CURRENT_USER_FAILED" = "CURRENT_USER_FAILED";
//экшены для обновления токена
export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";
//экшены для изменения инфо о пользователе (в /profile)
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
//экшены для выхода пользователя
export const LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST" = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS" = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED: "LOGOUT_USER_FAILED" = "LOGOUT_USER_FAILED";

export type TUserActions =
  | IUserRegisterRequest
  | IUserRegisterSuccess
  | IUserRegisterFailed
  | IRecoveryPasswordRequest
  | IRecoveryPasswordSuccess
  | IRecoveryPasswordFailed
  | ISavePasswordRequest
  | ISavePasswordSuccess
  | ISavePasswordFailed
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFailed
  | ITokenUpRequest
  | ITokenUpSuccess
  | ITokenUpFailed
  | ICurrentUserRequest
  | ICurrentUserSuccess
  | ICurrentUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | ILogoutUserRequest
  | ILogoutUserSuccess
  | ILogoutUserFailed;
interface IUserRegisterRequest {
  readonly type: typeof USER_REGISTER_REQUEST;
}
interface IUserRegisterSuccess {
  readonly type: typeof USER_REGISTER_SUCCESS;
  readonly payload: TUserRegistration;
}
interface IUserRegisterFailed {
  readonly type: typeof USER_REGISTER_FAILED;
  readonly payload: string;
}
interface IRecoveryPasswordRequest {
  readonly type: typeof CREATE_RECOVERY_PASSWORD_REQUEST;
}
interface IRecoveryPasswordSuccess {
  readonly type: typeof CREATE_RECOVERY_PASSWORD_SUCCESS;
  readonly payload: TUserEmailForgottenOrLogout;
}
interface IRecoveryPasswordFailed {
  readonly type: typeof CREATE_RECOVERY_PASSWORD_FAILED;
  readonly payload: string;
}
interface ISavePasswordRequest {
  readonly type: typeof SAVE_PASSWORD_REQUEST;
}
interface ISavePasswordSuccess {
  readonly type: typeof SAVE_PASSWORD_SUCCESS;
  readonly payload: TUserEmailReset;
}
interface ISavePasswordFailed {
  readonly type: typeof SAVE_PASSWORD_FAILED;
  readonly payload: string;
}
interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: TUserRegistration;
}
interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload: string;
}
interface ITokenUpRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
interface ITokenUpSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly payload: TRefreshToken;
}
interface ITokenUpFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
  readonly payload: string;
}
interface ICurrentUserRequest {
  readonly type: typeof CURRENT_USER_REQUEST;
}
interface ICurrentUserSuccess {
  readonly type: typeof CURRENT_USER_SUCCESS;
  readonly payload: TUser;
}
interface ICurrentUserFailed {
  readonly type: typeof CURRENT_USER_FAILED;
  readonly payload: string;
}
interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
}
interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: string;
}
interface ILogoutUserRequest {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
interface ILogoutUserSuccess {
  readonly type: typeof LOGOUT_USER_SUCCESS;
  readonly payload: TUser;
}
interface ILogoutUserFailed {
  readonly type: typeof LOGOUT_USER_FAILED;
  readonly payload: string;
}
const createOrderSuccess = (result: TUserRegistration): IUserRegisterSuccess => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: result,
  };
};
const createRecoveryPasswordSuccess = (result: TUserEmailForgottenOrLogout): IRecoveryPasswordSuccess => {
  return {
    type: CREATE_RECOVERY_PASSWORD_SUCCESS,
    payload: result,
  };
};
const savePasswordSuccess = (result: TUserEmailReset): ISavePasswordSuccess => {
  return {
    type: SAVE_PASSWORD_SUCCESS,
    payload: result,
  };
};
const loginUserSuccess = (result: TUserRegistration): ILoginUserSuccess => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: result,
  };
};
const updateTokenSuccess = (result: TRefreshToken): ITokenUpSuccess => {
  return {
    type: UPDATE_TOKEN_SUCCESS,
    payload: result,
  };
};
const updateCurrentUserSuccess = (result: TUser): ICurrentUserSuccess => {
  return {
    type: CURRENT_USER_SUCCESS,
    payload: result,
  };
};
const updatetUserSuccess = (result: TUser): IUpdateUserSuccess => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: result,
  };
};
const logoutUserSuccess = (result: TUserEmailForgottenOrLogout): ILogoutUserSuccess => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: result,
  };
};
//мидлвар. На экране /register пользователь вводит данные для регистрации
export const postNewUser = (password: string, name: string, email: string): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    return postRegistration(password, name, email)
      .then((result) => {
        setCookie("token", result.accessToken.split("Bearer ")[1]); //отделяем схему авторизации
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch(createOrderSuccess(result));
      })
      .catch((error) =>
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: error.message,
        })
      );
  };
};
//мидлвар. На экране /forgot-password пользователь вводит адрес электронной почты и нажимает кнопку «Восстановить»
export const postEmail = (data: string): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: CREATE_RECOVERY_PASSWORD_REQUEST,
    });
    return postEmailUser(data)
      .then((result) => dispatch(createRecoveryPasswordSuccess(result)))
      .catch((error) => {
        dispatch({
          type: CREATE_RECOVERY_PASSWORD_FAILED,
          payload: error.message,
        });
      });
  };
};
//мидлвар. На экране /reset-password пользователь вводит пароль и код и нажимает кнопку "Сохранить"
export const savePassword = (password: string, token: string): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: SAVE_PASSWORD_REQUEST,
    });
    return resetPassword(password, token)
      .then((result) => dispatch(savePasswordSuccess(result)))
      .catch((error) =>
        dispatch({
          type: SAVE_PASSWORD_FAILED,
          payload: error.message,
        })
      );
  };
};
//мидлвар авторизации. На экране /login пользователь вводит пароль, email и нажимает кнопку "Войти"
export const loginUser = (password: string, email: string): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    return postLoginUser(password, email)
      .then((result) => {
        setCookie("token", result.accessToken.split("Bearer ")[1]); //отделяем схему авторизации
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch(loginUserSuccess(result));
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_USER_FAILED,
          payload: error.message,
        });
      });
  };
};
//мидлвар для обновления токена
export const refreshToken = (): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    return postToken()
      .then((result) => {
        console.log("токен обновлен");
        setCookie("token", result.accessToken.split("Bearer ")[1]); //отделяем схему авторизации
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch(updateTokenSuccess(result));
      })
      .catch((error) => {
        console.log("токен не обновлен");
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          payload: error.message,
        });
        dispatch(logOutUser());
      });
  };
};
//мидлвар. получить инфо о пользователе
export const getUserInfo = (): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: CURRENT_USER_REQUEST,
    });
    return getUser()
      .then((result) => {
        if (result.success) {
          dispatch(updateCurrentUserSuccess(result));
        }
      })
      .catch((error) => {
        if (error.message === "Token is invalid" || error.message === "jwt malformed") {
          dispatch(refreshToken());
          dispatch(getUserInfo());
        } else {
          dispatch({
            type: CURRENT_USER_FAILED,
            payload: error.message,
          });
        }
      });
  };
};
//мидлвар для обновления инфо о пользователе
export const refreshUserInfo = (password: string, email: string, name: string): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    return patchUser(password, email, name)
      .then((result) => {
        dispatch(updatetUserSuccess(result));
        console.log(result);
      })
      .catch((error) => {
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
};
//мидлвар для выхода из приложения (на странице /profile кнопка 'Выйти')
export const logOutUser = (): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    return postLogoutUser()
      .then((result) => {
        deleteCookie("token");
        localStorage.removeItem("refreshToken");
        dispatch(logoutUserSuccess(result));
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_USER_FAILED,
          payload: error.message,
        });
      });
  };
};
