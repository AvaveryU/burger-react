import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage, RegisterPage } from "./pages";

ReactDOM.render(
  <Provider store={store}> 
    {/* <App /> */}
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <App />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/login/register" exact={true}>
          <RegisterPage />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

//функция для отслеживания метрик
reportWebVitals();