//страница авторизации
import React from "react";
import { useHistory, useLocation, useRouteMatch, Link } from "react-router-dom";
import styles from "./login.module.css";
import AppHeader from "../../components/appHeader/appHeader";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const LoginPage = () => {
  const [value, setValue] = React.useState("password");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <main className={styles.page}>
        <div className={styles.form}>
          <div className={`${styles.content}`}>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput className={`mt-6`} onChange={onChange} value={value} name={"email"} />
            <PasswordInput className={`mt-6`} name={"password"} onChange={onChange} value={value} />
            <Button type="primary" size="large">
              Войти
            </Button>
          </div>
          <div className={`${styles.text} ml-2`}>
            <p className={`text text_type_main-default text_color_inactive`}>
              Вы — новый пользователь?
              <Link to={{ pathname: `/login/register` }} className={`${styles.link} ml-2`}>
                Зарегистрироваться
              </Link>
            </p>
            <p className={`text text_type_main-default text_color_inactive mt-4`}>
              Забыли пароль?
              <Link to={{ pathname: `/login/forgot-password` }} className={`${styles.link} ml-2`}>
                Восстановить пароль
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
