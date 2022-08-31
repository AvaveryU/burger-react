import { postOrderDetails } from "../../utils/api";
import { AppThunk } from "../../services/store";
//экшены для заказа в бургерной
export const CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST" = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS: "CREATE_ORDER_REQUEST" = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED" = "CREATE_ORDER_FAILED";

//интерфейсы экшенов
export type TOrderActions = ICreateOrderSuccess | ICreateOrderFailed;

interface ICreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: number;
}
interface ICreateOrderFailed {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly payload: boolean | string;
}

const createOrderSuccess = (result: any): ICreateOrderSuccess => {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: result.order.number,
  };
};
const createOrderFailed = (error: string): ICreateOrderFailed => {
  return {
    type: CREATE_ORDER_FAILED,
    payload: error,
  };
};
//мидлвар для отправки данных на сервер
export const postOrderBurger = (data: Array<string>): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    return postOrderDetails(data)
      .then((result) => {
        console.log(result);
        dispatch(createOrderSuccess(result));
      })
      .catch((error) => dispatch(createOrderFailed(error)));
  };
};
