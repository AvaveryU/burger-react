import { postEmailUser } from "../../utils/api.js";
//экшены для форм восстановления пароля
//запрос на восстановление пароля (при нажатии на 'восстановить')
export const CREATE_RECOVERY_PASSWORD_REQUEST = "CREATE_RECOVERY_PASSWORD_REQUEST";
export const CREATE_RECOVERY_PASSWORD_SUCCESS = "CREATE_RECOVERY_PASSWORD_SUCCESS";
export const CREATE_RECOVERY_PASSWORD_FAILED = "CREATE_RECOVERY_PASSWORD_FAILED";
export const SET_EMAIL = "SET_EMAIL";

//мидлвар. На экране /forgot-password пользователь вводит адрес электронной почты и нажимает кнопку «Восстановить»
export function postEmail(data) {
  return (dispatch) => {
    dispatch({
      type: CREATE_RECOVERY_PASSWORD_REQUEST,
    });
    postEmailUser(data)
      .then((result) => {
        console.log(result);
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
