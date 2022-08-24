import { getIngredients } from "../../utils/api.ts";
//экшены для массива с ингредиентами
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

//мидлвар для получения данных с сервера
export function getIngredientsData() {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((result) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) =>
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: error,
        })
      );
  };
}
