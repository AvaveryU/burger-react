import { rootReducer } from "./reducers"; // Корневой редьюсер, который обрабатывает экшены
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//вызов расширения Redux DevTools. Проверка наличия объектов window и window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__. Если всё хорошо,
//вызовется расширение с пустым набором опций. В противном случае — вернется compose.
const composeEnhancers = typeof window === "object" &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

//расширитель хранилища, функция высшего порядка, которая возвращает новый, расширенный генератор хранилища
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Инициализируем хранилище с помощью корневого редьюсера
export const store = createStore(rootReducer, enhancer);
