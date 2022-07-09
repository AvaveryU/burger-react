import { CREATE_RECOVERY_PASSWORD_REQUEST, CREATE_RECOVERY_PASSWORD_SUCCESS, CREATE_RECOVERY_PASSWORD_FAILED,
  ADD_EMAIL
} from "../action/login.js";

const initialState = {
  email: "",
  success: false,
  message: "",
};
//редьюсер деталей текущего просматриваемого ингредиента
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
      case ADD_EMAIL:
      return {
        email: action.payload.email,
      };
    default:
      return state;
  }
};
