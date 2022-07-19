// import { useAuth } from "../services/auth";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  
  const {isAuthChecked, isForgotPasswordChecked} = useSelector((state) => state.user);  //флаг пользователя авторизованного и флаг сброса пароля

  return <Route {...rest} render={({ location }) =>
  (isAuthChecked || isForgotPasswordChecked ?
  children :
  <Redirect to={{ pathname: "/login", state: { from: location } }} />)} />;
  // В from сохраним текущий маршрут
}
