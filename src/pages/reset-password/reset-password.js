//страница сброса пароля
import { useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./reset-password.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { savePassword } from "../../services/action/user.js";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { password, token, isPasswordChecked } = useSelector((state) => state.user);
  //стейты для полей ввода
  const [inputPassword, setPassword] = useState(password);
  const [valueToken, setToken] = useState(token);

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeToken = (event) => {
    setToken(event.target.value);
  };
  const handleSubmitPassword = (event) => {
    event.preventDefault();
    dispatch(savePassword(inputPassword, valueToken)); //диспатчить данные о email
  };
  //если сработал флаг изменения пароля, перебросить на /profile
  if (isPasswordChecked) {
    return <Redirect to={location.state?.from || "/profile"} />;
  }
  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`reset_password-form`} className={`${styles.form}`} onSubmit={handleSubmitPassword}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <PasswordInput onChange={onChangePassword} value={inputPassword} placeholder={"Введите новый пароль"} name={"password"} />
              <Input onChange={onChangeToken} value={valueToken} type={"text"} placeholder={"Введите код из письма"} name={"code"} />
              <Button type="primary" size="large" disabled={inputPassword && valueToken ? false : true}>
                Сохранить
              </Button>
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
