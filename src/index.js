import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//функция для отслеживания метрик
reportWebVitals();
