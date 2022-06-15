import { v4 as uuidv4 } from 'uuid';
//экшены для конструктора ингредиентов
export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const DELETE_INGREDIENT_CONSTRUCTOR = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const RESET_INGREDIENT_CONSTRUCTOR = "RESET_INGREDIENT_CONSTRUCTOR";

//action creator для добавления ингредиента из конструктора
export function addItem(item) {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    payload: {
      ...item,
      id: uuidv4(),
    },
  };
}
//action creator для удаления ингредиента из конструктора
export function deleteItem(id) {
  return {
    type: DELETE_INGREDIENT_CONSTRUCTOR,
    id: id,
  };
}
//action creator для очистки конструктора после заказа
export function resetAfterOrder() {
  return {
    type: RESET_INGREDIENT_CONSTRUCTOR,
  };
}
