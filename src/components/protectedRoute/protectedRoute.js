// import { useAuth } from "../services/auth";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { isAuthChecked, isForgotPasswordChecked, isLogin } = useSelector((state) => state.user); //флаг пользователя авторизованного, флаг сброса пароля, флаг текущего пользователя

  return <Route {...rest} render={({ location }) => (isAuthChecked || isForgotPasswordChecked || isLogin ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />)} />;
  // В from сохраним текущий маршрут
}
