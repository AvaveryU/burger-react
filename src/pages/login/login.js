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
    isAuthChecked
  } = useSelector((state) => state.user);
  //стейты для полей ввода
  const [isPassword, setPassword] = useState(password);
  const [isEmail, setEmail] = useState(email);
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
    dispatch(loginUser(isPassword, isEmail));
  };
  //если сработал флаг авторизации, перебросить на главную страницу
  if (isAuthChecked) {
    return <Redirect to={location.state?.from || "/profile"} />;
  }
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
                value={isEmail}
                name={"email"}
                icon={"EditIcon"}
                placeholder={"E-mail"}
                ref={refInputEmail}
              />
              <PasswordInput className={`mt-6`} name={"password"} onChange={onLoginPassword} value={isPassword} />
              <Button type="primary" size="large" onClick={handleLogin} disabled={(isEmail && isPassword ) ? false : true }>
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
