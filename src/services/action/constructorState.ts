import { v4 as uuidv4 } from "uuid";
import { TingredientPropType } from "../../utils/types";
//экшены для конструктора ингредиентов
export const ADD_INGREDIENT_CONSTRUCTOR: "ADD_INGREDIENT_CONSTRUCTOR" = "ADD_INGREDIENT_CONSTRUCTOR";
export const DELETE_INGREDIENT_CONSTRUCTOR: "REMOVE_INGREDIENT_CONSTRUCTOR" = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const RESET_INGREDIENT_CONSTRUCTOR: "RESET_INGREDIENT_CONSTRUCTOR" = "RESET_INGREDIENT_CONSTRUCTOR";
export const MOVE_INGREDIENT_CONSTRUCTOR: "MOVE_INGREDIENT_CONSTRUCTOR" = "MOVE_INGREDIENT_CONSTRUCTOR";

//интерфейсы экшенов
export type TConstructorActions = IDeleteItem | IAddItem | IResetAfterOrder | IMoveItem;

interface IDeleteItem {
  readonly type: typeof DELETE_INGREDIENT_CONSTRUCTOR;
  readonly id: string | undefined;
}
interface IAddItem {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  readonly payload: TingredientPropType;
}
interface IResetAfterOrder {
  readonly type: typeof RESET_INGREDIENT_CONSTRUCTOR;
}
interface IResetAfterOrder {
  readonly type: typeof RESET_INGREDIENT_CONSTRUCTOR;
}
interface IMoveItem {
  readonly type: typeof MOVE_INGREDIENT_CONSTRUCTOR;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}
//action creator для добавления ингредиента в конструктор
export function addItem(item: TingredientPropType): IAddItem {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    payload: {
      ...item,
      id: uuidv4(),
    },
  };
}
//action creator для удаления ингредиента из конструктора
export function deleteItem(id: string | undefined): IDeleteItem {
  return {
    type: DELETE_INGREDIENT_CONSTRUCTOR,
    id: id,
  };
}
//action creator для очистки конструктора после заказа
export function resetAfterOrder(): IResetAfterOrder {
  return {
    type: RESET_INGREDIENT_CONSTRUCTOR,
  };
}
//action creator для перестановки ингредиентов
export function moveItem(dragIndex: number, hoverIndex: number): IMoveItem {
  return {
    type: MOVE_INGREDIENT_CONSTRUCTOR,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
}
