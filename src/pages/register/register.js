//страница регистрации
import React from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { postNewUser, setPassword, setName, setEmail } from "../../services/action/user.js";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { user: {email, name}, password } = useSelector((state) => state.user);
  const onRegisterName = (event) => {
    let inputName = event.target.value;
    dispatch(setName(inputName));
  };
  const onRegisterEmail = (event) => {
    let inputEmail = event.target.value;
    dispatch(setEmail(inputEmail));
  };
  const onRegisterPassword = (event) => {
    let inputPassword = event.target.value;
    dispatch(setPassword(inputPassword));
  };
  const handleRegisterUser = () => {
    dispatch(postNewUser(password, name, email)); //отправить данные о новом пользователе
  };
  return (
    <>
      <main className={styles.page}>
        <div className={styles.register}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`register-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Регистрация</h2>
              <Input className={`mt-20`} onChange={onRegisterName} value={name} type={"text"} placeholder={"Имя"} name={"name"} />
              <Input className={`mt-6`} onChange={onRegisterEmail} value={email} type={"email"} placeholder={"E-mail"} name={"email"} />
              <PasswordInput className={`mt-6`} onChange={onRegisterPassword} value={password} name={"password"} />
              <Button type="primary" size="medium" onClick={handleRegisterUser}>
                Зарегистрироваться
              </Button>
            </form>
          </div>
          <div className={`${styles.text} ml-2`}>
            <p className={`text text_type_main-default text_color_inactive`}>
              Уже зарегистрированы?
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
