//страница авторизации
import React, { useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./login.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/action/user.js";
export const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //данные о пытающемся войти пользователе
  const {
    user: { email },
    password,
    isLogin,
    loginUserError,
    message,
  } = useSelector((state) => state.user);
  //стейты для полей ввода
  const [inputPassword, setPassword] = useState(password);
  const [inputEmail, setEmail] = useState(email);
  //реф для поля Email
  const refInputEmail = React.useRef("email");
  //функция для ввода пароля
  const onLoginPassword = (event) => {
    setPassword(event.target.value);
  };
  //функция для ввода Email
  const onLoginEmail = (event) => {
    setEmail(event.target.value);
  };
  //функция при клике на иконку редактирования поля Email
  const onIconClick = (data) => {
    if (refInputEmail === data) {
      setTimeout(() => refInputEmail.current.focus(), 0);
    }
  };
  //диспатчим данные для авторизации при клике на "Войти"
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(inputPassword, inputEmail));
  };
  //если сработали флаги авторизации, перебросить на главную страницу
  if (isLogin) {
    return <Redirect to={location.state?.from || "/profile"} />;
  }
  console.log();
  return (
    <>
      <main className={styles.page}>
        <div className={styles.login}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`login-form`} className={`${styles.form}`} onSubmit={handleLogin}>
              <h2 className="text text_type_main-medium">Вход</h2>
              <Input
                className={`mt-6`}
                onChange={onLoginEmail}
                onIconClick={() => onIconClick(refInputEmail)}
                value={inputEmail || ""}
                name={"email"}
                icon={"EditIcon"}
                placeholder={"E-mail"}
                ref={refInputEmail}
              />
              <PasswordInput className={`mt-6`} name={"password"} onChange={onLoginPassword} value={inputPassword || ""} />
              <Button type="primary" size="large" disabled={inputEmail && inputPassword ? false : true}>
                Войти
              </Button>
            </form>
          </div>
          {loginUserError && <span className={`${styles.error} text text_type_main-small`}>{message}</span>}
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
