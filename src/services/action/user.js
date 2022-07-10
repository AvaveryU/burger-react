//экшены для форм регистрации/входа
import { postRegistration } from "../../utils/api.js";
//запрос на регистрацию (при нажатии на 'зарегистрироваться')
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
//мидлвар. На экране /register пользователь вводит данные для регистрации
export function postNewUser(email, password, name) {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    postRegistration(email, password, name)
      .then((result) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: {
            email: result.user.email,
            name: result.user.name,
          },
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
//action creator для установки пароля
export function setPassword(data) {
  return {
    type: SET_PASSWORD,
    payload: { password: data },
  };
}
//action creator для установки имени
export function setName(data) {
  return {
    type: SET_NAME,
    payload: { name: data },
  };
}
//action creator для установки email
export function setEmail(data) {
  return {
    type: SET_EMAIL,
    payload: { email: data },
  };
}
