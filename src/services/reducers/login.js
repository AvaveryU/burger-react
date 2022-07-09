import { CREATE_RECOVERY_PASSWORD_REQUEST, CREATE_RECOVERY_PASSWORD_SUCCESS, CREATE_RECOVERY_PASSWORD_FAILED,
  SET_EMAIL
} from "../action/login.js";

const initialState = {
  email: "",
  success: false,
  message: "",
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
    default:
      return state;
  }
};
