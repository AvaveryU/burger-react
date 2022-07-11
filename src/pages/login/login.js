//страница авторизации
import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { loginPassword, loginEmail, loginUser } from "../../services/action/user.js";

export const LoginPage = () => {
  const dispatch = useDispatch();
  //данные о пытающемся войти пользователе
  const { user: { email }, password } = useSelector((state) => state.user);
  //реф для поля Email
  const refInputEmail = React.useRef("email");
  //функция для ввода пароля
  const onLoginPassword = (event) => {
    let inputPassword = event.target.value;
    dispatch(loginPassword(inputPassword));
  };
  //функция для ввода Email
  const onLoginEmail = (event) => {
    let inputEmail = event.target.value;
    dispatch(loginEmail(inputEmail));
  };
  //отправить данные для авторизации при клике на "Войти"
  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };
  //функция при клике на иконку редактирования
  const onIconClick = (data) => {
    if (refInputEmail === data) {
      setTimeout(() => refInputEmail.current.focus(), 0);
    }
  };
  return (
    <>
      <main className={styles.page}>
        <div className={styles.login}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`login-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Вход</h2>
              <Input
                className={`mt-6`}
                onChange={onLoginEmail}
                onIconClick={() => onIconClick(refInputEmail)}
                value={email}
                name={"email"}
                icon={"EditIcon"}
                placeholder={"E-mail"}
                ref={refInputEmail}
              />
              <PasswordInput className={`mt-6`} name={"password"} onChange={onLoginPassword} value={password} />
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
