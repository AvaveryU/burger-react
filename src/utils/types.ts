import { TConstructorActions } from "../services/action/constructorState";
import { TIngredientsActions } from "../services/action/ingredients";
import { TOrderActions } from "../services/action/order";
import { TDetailsModalActions } from "../services/action/details";
import { TUserActions } from "../services/action/user";
import { TWsActions } from "../services/action/wsActions";
import { TWsAuthActions } from "../services/action/wsActionsUser";

//тип для всех экшенов в приложении
export type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TDetailsModalActions
  | TUserActions
  | TWsActions
  | TWsAuthActions;
//интерфейс для объекта с экшенами вебсокета для неавторизованного пользователя
export interface IwsActions {
  readonly wsInit: string;
  readonly wsClose: string;
  readonly onOpen: string;
  readonly onClose: string;
  readonly onError: string;
  readonly onMessage: string;
}
//интерфейс для объекта с экшенами вебсокета для авторизованного пользователя
export interface IwsActionsAuthUser extends IwsActions {
  readonly wsSendData?: string;
}
//интерфейс для структуры получаемого ингредиента с сервера
export type TingredientPropType = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  id?: string;
  count?: number;
  ownId?: string;
};
//тип данных об ингредиентах
export type TIngredientDetails = {
  readonly data: Array<TingredientPropType>;
  readonly success: boolean;
};
//тип заказа
export type TOrder = {
  readonly number: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _id: string;
  readonly owner: string[];
  readonly price: number;
  readonly ingredients: string[];
  readonly name?: string;
};
//тип структуры заказа
export type TOrderDetails = {
  name: string;
  order: TOrder;
  success: boolean;
};
//тип структуры ответа о всех заказах
export type TWsOrdersDetails = {
  data: {
    readonly success: boolean;
    readonly orders: Array<TOrder>;
    readonly total: number;
    readonly totalToday: number;
  };
};
//тип структуры ответа о восстановлении пароля
export interface TUserEmailForgottenOrLogout extends TUser {
  readonly message: string;
}
//тип структуры ответа о сбросе пароля
export type TUserEmailReset = {
  readonly password: string;
  readonly token: string;
};
//тип структуры ответа при регистрации
export interface TUserRegistration extends TUser {
  readonly accessToken: string;
  readonly refreshToken: string;
}
//тип структуры ответа данных о пользователе
export interface TUser {
  readonly success: boolean;
  readonly user: {
    email: string;
    name: string;
  };
  readonly password: string;
}
//тип при обновлении токена
export type TRefreshToken = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};
//тип для защищенного роутинга
export interface IProtectedRoute {
  anonymous?: boolean;
  user?: {
    email: string;
    name?: string;
    password?: string;
  };
  children?: JSX.Element;
  path?: string;
  exact?: boolean;
}
//тип для текущего url
export type TLocationState = {
  from?: string;
  background?: TLocation;
};
type TLocation = {
  hash: string;
  key?: string;
  pathname: string;
  search: string;
  state: TLocationState;
};
export interface TBurgerConstructorProps {
  onOpenModal: (...arg: string[]) => void;
}
export interface TBurgerIngredientProps extends TBurgerConstructorProps {
  ingredient: TingredientPropType;
  type: string;
}
export interface TIngredientsCategoryProps extends TBurgerConstructorProps {
  title: string;
  type: string;
}
export type TConstructorIngredientProps = {
  index: number;
  item: TingredientPropType;
  handleClose: () => void;
};
export type TModalProps = {
  title?: string;
  children?: any;
  onClose: () => void;
};
