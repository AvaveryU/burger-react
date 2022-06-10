//экшены для конструктора ингредиентов
export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const DELETE_INGREDIENT_CONSTRUCTOR = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const ADD_INGREDIENT_BUN_CONSTRUCTOR = "ADD_INGREDIENT_BUN_CONSTRUCTOR";

//экшен для днд
export function addItem(item, uId) {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    payload: {
      ...item,
      uId: uId,
    },
  };
}
//экшен для днд
export function addBun(item, uId) {
  return {
    type: ADD_INGREDIENT_BUN_CONSTRUCTOR,
    payload: {
      ...item,
      uId: uId,
    },
  };
}
//экшен для днд
export function deleteItem(uId) {
  return {
    type: DELETE_INGREDIENT_CONSTRUCTOR,
    uId: uId
  };
}
