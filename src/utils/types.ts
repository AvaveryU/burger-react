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
//!тип для структуры получаемого ингредиента с сервера
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
};
//тип структуры заказа
export type TOrderDetails = {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
};
//тип структуры ответа о восстановлении пароля
export type TUserEmailForgotten = {
  readonly message: string;
  readonly success: boolean;
};
//тип структуры ответа о сбросе пароля
export type TUserEmailResetOrLogout = {
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
//тип структуры ответа данных о пользователе
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
// export interface CustomBody<T extends any> extends Body {
//   json(): Promise<T>;
// }

// export interface CustomResponse<T> extends CustomBody<T> {
//   readonly headers: Headers;
//   readonly ok: boolean;
//   readonly redirected: boolean;
//   readonly status: number;
//   readonly statusText: string;
//   readonly trailer: Promise<Headers>;
//   readonly type: ResponseType;
//   readonly url: string;
//   clone(): Response;
// }
