import { FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { IProtectedRoute } from "../../utils/types";
import { useSelector } from "../../services/store";

export const ProtectedRoute: FunctionComponent<IProtectedRoute> = ({ anonymous = false, user, children, ...rest }) => {
  const { isForgotPasswordChecked, isLogin } = useSelector((state) => state.user); //флаг пользователя авторизованного, флаг сброса пароля, флаг текущего пользователя

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin || isForgotPasswordChecked ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
  // В from сохраним текущий маршрут
};
