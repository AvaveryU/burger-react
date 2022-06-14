import { postOrderDetails } from "../../utils/api.js";
//экшены для заказа в бургерной
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

//мидлвар для отправки данных на сервер
export function postOrderBurger(data) {
  return (dispatch) => {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    postOrderDetails(data)
      .then((result) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: result.order.number,
        });
      })
      .catch((error) =>
        dispatch({
          type: CREATE_ORDER_FAILED,
          payload: error,
        })
      );
  };
}
