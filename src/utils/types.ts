import { rootReducer } from "../services/reducers/index";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TConstructorActions } from "../services/action/constructorState";
import { TIngredientsActions } from "../services/action/ingredients";
import { TOrderActions } from "../services/action/order";

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
  readonly wsSendData: string;
}
//интерфейс для структуры получаемого ингредиента с сервера
export interface TingredientPropType {
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
  readonly id?: string;
  count?: number;
}
//тип структуры заказа
export type TOrderDetails = {
  readonly createdAt?: string;
  readonly ingredients?: ReadonlyArray<string>;
  readonly name?: string;
  readonly number?: number;
  readonly status?: string;
  readonly updatedAt?: string;
  readonly _id?: string;
};
//!тип структуры ответа о восстановлении пароля
export type TUserEmailForgottenOrLogout = {
  readonly message: string;
  readonly success: boolean;
};
//тип структуры ответа о сбросе пароля
export type TUserEmailReset = {
  readonly password: string;
  readonly token: string;
};
//тип структуры ответа при регистрации
export type TUserRegistration = {
  readonly success: boolean;
  readonly user: {
    email: string;
    name: string;
  };
  readonly accessToken: string;
  readonly refreshToken: string;
};
//!тип структуры ответа данных о пользователе
export type TUser = {
  readonly success: boolean;
  readonly user: {
    email: string;
    name: string;
  };
};
//тип при обновлении токена
export type TRefreshToken = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};
//!тип структуры ответа о всех заказах ????
export type TOrdersDetails = {
  readonly success: boolean;
  readonly orders: [
    {
      readonly number: number;
      readonly status: string;
      readonly createdAt: string;
      readonly updatedAt: string;
      readonly _id: string;
    }
  ];
  readonly total: number;
  readonly totalToday: number;
};
//тип для всех экшенов в приложении
//!добавить экшены из других файлов
type TApplicationActions = TConstructorActions | TIngredientsActions | TOrderActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
