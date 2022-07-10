import {
  CREATE_RECOVERY_PASSWORD_REQUEST,
  CREATE_RECOVERY_PASSWORD_SUCCESS,
  CREATE_RECOVERY_PASSWORD_FAILED,
  SET_EMAIL,
  SET_PASSWORD,
  SET_TOKEN,
  SAVE_PASSWORD_REQUEST,
  SAVE_PASSWORD_SUCCESS,
  SAVE_PASSWORD_FAILED,
  LOGIN_USER_EMAIL,
  LOGIN_USER_PASSWORD,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from "../action/login.js";

const initialState = {
  email: "",
  success: false,
  message: "",
  password: "",
  token: "",
};
//редьюсер для авторизации
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECOVERY_PASSWORD_REQUEST:
      return {
        ...state,
        success: false,
        message: "await...",
      };
    case CREATE_RECOVERY_PASSWORD_SUCCESS:
      return {
        ...state,
        email: action.payload,
        success: true,
        message: "Reset email sent",
      };
    case CREATE_RECOVERY_PASSWORD_FAILED:
      return {
        ...state,
        success: false,
        message: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case SAVE_PASSWORD_REQUEST:
      return {
        ...state,
        success: false,
        message: "await...",
      };
    case SAVE_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        message: "Password successfully reset",
        password: action.payload.password,
        token: action.payload.token,
      };
    case SAVE_PASSWORD_FAILED:
      return {
        ...state,
        success: false,
        message: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
      case LOGIN_USER_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
      case LOGIN_USER_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
      case LOGIN_USER_REQUEST:
      return {
        ...state,
        success: false,
        message: "await...",
      };
      case LOGIN_USER_SUCCESS:
      return {
        ...state,
        success: true,
        password: action.payload.password,
        email: action.payload.email,
      };
      case LOGIN_USER_FAILED:
      return {
        ...state,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};