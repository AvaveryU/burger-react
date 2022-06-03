import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { rootReducer } from "./services/reducers"; // Корневой редьюсер, который обрабатывает экшены
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reportWebVitals from './reportWebVitals';

const composeEnhancers = typeof window === "object" &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
// Инициализируем хранилище с помощью корневого редьюсера
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById("root")
);
//функция для отслеживания метрик
reportWebVitals();