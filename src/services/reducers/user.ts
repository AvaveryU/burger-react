import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  CREATE_RECOVERY_PASSWORD_REQUEST,
  CREATE_RECOVERY_PASSWORD_SUCCESS,
  CREATE_RECOVERY_PASSWORD_FAILED,
  SAVE_PASSWORD_REQUEST,
  SAVE_PASSWORD_SUCCESS,
  SAVE_PASSWORD_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  TUserActions,
} from "../action/user";
type TInitialState = {
  user: {
    email: string;
    name: string;
  };
  password: string;
  message: string;
  token: string;
  isAuthChecked: boolean;
  isLogin: boolean;
  isRegisterChecked: boolean;
  isForgotPasswordChecked: boolean;
  isPasswordChecked: boolean;
  isRefreshToken: boolean;
  isUpdateUser: boolean;
  isLogOut: boolean;
  loginUserError: boolean;
};
const initialState: TInitialState = {
  user: {
    email: "",
    name: "",
  },
  password: "",
  message: "",
  token: "", //код для сброса пароля
  isAuthChecked: false, //флаг для идентификации
  isLogin: false, //флаг для авторизации
  isRegisterChecked: false, //флаг для регистрации
  isForgotPasswordChecked: false, //флаг на странице /forgot-password
  isPasswordChecked: false, //флаг на странице /reset-password
  isRefreshToken: false, //флаг на обновленный токен
  isUpdateUser: false, //флаг на странице /profile
  isLogOut: false, //флаг выхода из ЛК
  loginUserError: false, //флаг ошибки при неверных логин/пароль
};
//редьюсер регистрации/аутентификации/авторизации
export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isRegisterChecked: false,
        message: "await...",
      };
    case USER_REGISTER_SUCCESS: //успешная РЕГИСТРАЦИЯ
      return {
        ...state,
        isRegisterChecked: true,
        user: { email: action.payload.user.email, name: action.payload.user.name },
        password: action.payload.password,
        message: "success registration",
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        isRegisterChecked: false,
      };
    case CREATE_RECOVERY_PASSWORD_REQUEST:
      return {
        ...state,
        isForgotPasswordChecked: false,
        message: "await...",
      };
    case CREATE_RECOVERY_PASSWORD_SUCCESS: //успешный СБРОС пароля
      return {
        ...state,
        isForgotPasswordChecked: true,
        message: "Reset email sent",
      };
    case CREATE_RECOVERY_PASSWORD_FAILED:
      return {
        ...state,
        isForgotPasswordChecked: false,
        message: action.payload,
      };
    case SAVE_PASSWORD_REQUEST:
      return {
        ...state,
        message: "await...",
        isPasswordChecked: false,
      };
    case SAVE_PASSWORD_SUCCESS: //успешное ИЗМЕНЕНИЕ пароля
      return {
        ...state,
        isPasswordChecked: true,
        message: "Password successfully reset",
        password: action.payload.password,
        token: action.payload.token,
      };
    case SAVE_PASSWORD_FAILED:
      return {
        ...state,
        isPasswordChecked: false,
        message: action.payload,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLogin: false,
        message: "Ждите...",
      };
    case LOGIN_USER_SUCCESS: //успешная АВТОРИЗАЦИЯ пользователя
      return {
        ...state,
        isLogin: true,
        user: action.payload.user,
        password: action.payload.password,
        message: "done!",
        loginUserError: false,
      };
    case LOGIN_USER_FAILED:
      if (action.payload === "email or password are incorrect") {
        return {
          ...state,
          loginUserError: true,
          message: "E-mail или пароль введен неверно",
          isLogin: false,
        };
      }
      return {
        ...state,
        message: action.payload,
        loginUserError: action.payload,
        isLogin: false,
      };
    case CURRENT_USER_REQUEST:
      return {
        ...state,
        message: "await...",
        isAuthChecked: false,
      };
    case CURRENT_USER_SUCCESS: //успешная ИДЕНТИФИКАЦИЯ пользователя
      return {
        ...state,
        user: { email: action.payload.user.email, name: action.payload.user.name },
        isAuthChecked: true,
        isLogin: true,
        message: "done!",
        isLogOut: false,
      };
    case CURRENT_USER_FAILED:
      return {
        ...state,
        isAuthChecked: false,
        message: action.payload,
      };
    case UPDATE_TOKEN_REQUEST:
      return {
        ...state,
        message: "await...",
      };
    case UPDATE_TOKEN_SUCCESS: //успешное ОБНОВЛЕНИЕ токена
      return {
        ...state,
        isRefreshToken: true,
        message: "token refresh!",
        isAuthChecked: true,
      };
    case UPDATE_TOKEN_FAILED:
      return {
        ...state,
        isRefreshToken: false,
        message: action.payload,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        message: "await...",
      };
    case UPDATE_USER_SUCCESS: //успешное ОБНОВЛЕНИЕ пользователя
      return {
        ...state,
        user: { email: action.payload.user.email, name: action.payload.user.name },
        password: action.payload.password,
        isUpdateUser: true,
        message: "done!",
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isRefreshToken: false,
        message: action.payload,
        isUpdateUser: false,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        message: "await...",
      };
    case LOGOUT_USER_SUCCESS: //успешный ВЫХОД из ЛК
      return {
        ...state,
        user: {},
        isLogOut: true,
        isLogin: false,
        isAuthChecked: false,
      };
    case LOGOUT_USER_FAILED:
      return {
        ...state,
        message: action.payload,
        isLogOut: false,
      };
    default:
      return state;
  }
};
