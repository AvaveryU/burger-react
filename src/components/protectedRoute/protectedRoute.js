// import { useAuth } from "../services/auth";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ user, children, ...rest }) {
  return <Route {...rest} render={({ location }) =>
  (user.name !== "" && user.email !== "" ?
  children :
  <Redirect to={{ pathname: "/login", state: { from: location } }} />)} />;
  // В from сохраним текущий маршрут
}
