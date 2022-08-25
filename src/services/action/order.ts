import { postOrderDetails } from "../../utils/api";
import { AppThunk, TOrdersDetails, TOrderDetails } from "../../utils/types";
//экшены для заказа в бургерной
export const CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST" = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS: "CREATE_ORDER_REQUEST" = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED" = "CREATE_ORDER_FAILED";

//интерфейсы экшенов
export type TOrderActions = ICreateOrderReguest | ICreateOrderSuccess | ICreateOrderFailed;

interface ICreateOrderReguest {
  readonly type: typeof CREATE_ORDER_REQUEST;
}
interface ICreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: TOrderDetails;
}
interface ICreateOrderFailed {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly payload: string;
}

const createOrderReguest = (): ICreateOrderReguest => {
  return {
    type: CREATE_ORDER_REQUEST,
  };
};
const createOrderSuccess = (result: { order: TOrderDetails }): ICreateOrderSuccess => {
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
    dispatch(createOrderReguest);
    return postOrderDetails(data)
      .then((result) => {
        dispatch(createOrderSuccess(result));
      })
      .catch((error) => dispatch(createOrderFailed(error)));
  };
};
