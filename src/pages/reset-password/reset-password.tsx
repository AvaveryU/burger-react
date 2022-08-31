//страница сброса пароля
import { useState, FormEventHandler, ChangeEvent, FunctionComponent } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./reset-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector, TLocationState } from "../../utils/types";
import { savePassword } from "../../services/action/user";

export const ResetPassword: FunctionComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { password, token, isPasswordChecked } = useSelector((state) => state.user);
  //стейты для полей ввода
  const [inputPassword, setPassword] = useState<string>(password);
  const [valueToken, setToken] = useState<string>(token);

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeToken = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };
  const handleSubmitPassword: FormEventHandler = (event): void => {
    event.preventDefault();
    dispatch(savePassword(inputPassword, valueToken)); //диспатчить данные о email
  };
  //если сработал флаг изменения пароля, перебросить на /profile
  if (isPasswordChecked) {
    return <Redirect to={(location as TLocationState)?.from || "/profile"} />;
  }
  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`reset_password-form`} className={`${styles.form}`} onSubmit={handleSubmitPassword}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <Input
                onChange={onChangePassword}
                value={inputPassword}
                placeholder={"Введите новый пароль"}
                name={"password"}
                type={"password"}
              />
              <Input
                onChange={onChangeToken}
                value={valueToken}
                type={"text"}
                placeholder={"Введите код из письма"}
                name={"code"}
              />
              <Button
                type="primary"
                size="large"
                disabled={inputPassword && valueToken ? false : true}
                children="Сохранить"
              />
            </form>
          </div>
          <div className={`${styles.text} ml-2`}>
            <p className={`text text_type_main-default text_color_inactive`}>
              Вспомнили пароль?
              <Link to={{ pathname: `/login` }} className={`${styles.link} ml-2`}>
                Войти
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
