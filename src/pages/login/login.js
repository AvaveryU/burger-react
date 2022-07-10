//страница авторизации
import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { loginPassword, loginEmail, loginUser } from "../../services/action/login.js";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { password, email } = useSelector((state) => state.login);
  
  const onLoginPassword = (event) => {
    let inputPassword = event.target.value;
    dispatch(loginPassword(inputPassword));
  };
  const onLoginEmail = (event) => {
    let inputEmail = event.target.value;
    dispatch(loginEmail(inputEmail));
  };
  const handleLogin = () => {
    dispatch(loginUser(password, email)); //отправить данные о email
  };
  return (
    <>
      <main className={styles.page}>
        <div className={styles.login}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`login-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Вход</h2>
              <EmailInput className={`mt-6`} onChange={onLoginEmail} value={email} name={"email"} />
              <PasswordInput
                className={`mt-6`}
                name={"password"}
                onChange={onLoginPassword}
                value={password}
              />
              <Button type="primary" size="large" onClick={handleLogin}>
                Войти
              </Button>
            </form>
          </div>
          <div className={`${styles.text} ml-2`}>
            <p className={`text text_type_main-default text_color_inactive`}>
              Вы — новый пользователь?
              <Link to={{ pathname: `/register` }} className={`${styles.link} ml-2`}>
                Зарегистрироваться
              </Link>
            </p>
            <p className={`text text_type_main-default text_color_inactive mt-4`}>
              Забыли пароль?
              <Link to={{ pathname: `/forgot-password` }} className={`${styles.link} ml-2`}>
                Восстановить пароль
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};