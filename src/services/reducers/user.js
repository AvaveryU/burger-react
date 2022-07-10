import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED, SET_PASSWORD, SET_NAME, SET_EMAIL } from "../action/user.js";
const initialState = {
  success: false,
  user: {
    email: "",
    name: "",
    password: "",
  },
  accessToken: "Bearer ...",
  refreshToken: "",
};
//редьюсер для регистрации
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        success: false,
        message: "await...",
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.payload,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        success: false,
      };
    case SET_PASSWORD:
      return {
        ...state,
        user: { ...state.user, password: action.payload.password },
      };
    case SET_NAME:
      return {
        ...state,
        user: { ...state.user, name: action.payload.name },
      };
    case SET_EMAIL:
      return {
        ...state,
        user: { ...state.user, email: action.payload.email },
      };
    default:
      return state;
  }
};
