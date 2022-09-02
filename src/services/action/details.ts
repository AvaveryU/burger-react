//экшены для попапов
export const OPEN_ORDER_MODAL: "OPEN_ORDER_MODAL" = "OPEN_ORDER_MODAL";
export const OPEN_INGREDIENT_MODAL: "OPEN_INGREDIENT_MODAL" = "OPEN_INGREDIENT_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";
export const OPEN_ORDER_USERS_MODAL: "OPEN_ORDER_USERS_MODAL" = "OPEN_ORDER_USERS_MODAL";

//интерфейсы экшенов
export type TDetailsModalActions = IOrderModal | IIngredientModal | IClosedModal | IUserModal;

interface IOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}
interface IIngredientModal {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
}
interface IClosedModal {
  readonly type: typeof CLOSE_MODAL;
}
interface IUserModal {
  readonly type: typeof OPEN_ORDER_USERS_MODAL;
}
