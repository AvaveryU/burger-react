import { rootReducer } from "./reducers"; // Корневой редьюсер, который обрабатывает экшены
import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions, wsActionsAuthUser } from "../utils/utils";
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { TApplicationActions } from "../utils/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
//вызов расширения Redux DevTools. Проверка наличия объектов window и window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__. Если всё хорошо,
//вызовется расширение с пустым набором опций. В противном случае — вернется compose.
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

//расширитель хранилища, функция высшего порядка, которая возвращает новый, расширенный генератор хранилища
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, socketMiddleware(wsActions), socketMiddleware(wsActionsAuthUser))
);

// Инициализируем хранилище с помощью корневого редьюсера
export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
