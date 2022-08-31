import { getIngredients } from "../../utils/api";
import { AppThunk, TingredientPropType } from "../../utils/types";

//экшены для массива с ингредиентами
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

//интерфейсы экшенов
export type TIngredientsActions = IGetIngredientsReguest | IGetIngredientsSuccess | IGetIngredientsFailed;

interface IGetIngredientsReguest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TingredientPropType>;
}
interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly payload: string;
}

const getIngredientsReguest = (): IGetIngredientsReguest => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};
const getIngredientsSuccess = (result: any): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: result.data,
  };
};
const getIngredientsFailed = (error: string): IGetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
    payload: error,
  };
};
//мидлвар для получения данных с сервера
export const getIngredientsData = (): AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    dispatch(getIngredientsReguest());
    return getIngredients()
      .then((result) => {
        dispatch(getIngredientsSuccess(result));
      })
      .catch((error) => dispatch(getIngredientsFailed(error)));
  };
};
