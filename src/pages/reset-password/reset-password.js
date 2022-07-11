//страница сброса пароля
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { savePassword, setPassword, setToken } from "../../services/action/user.js";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const { password, token } = useSelector((state) => state.user);
  
  const onChangePassword = (event) => {
    let inputPassword = event.target.value;
    dispatch(setPassword(inputPassword));
  };
  const onChangeToken = (event) => {
    let inputToken = event.target.value;
    dispatch(setToken(inputToken));
  };
  const handleSubmitPassword = () => {
    dispatch(savePassword(password, token)); //отправить данные о email
  };
  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`reset_password-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <PasswordInput onChange={onChangePassword} value={password} placeholder={"Введите новый пароль"} name={"password"} />
              <Input onChange={onChangeToken} value={token} type={"text"} placeholder={"Введите код из письма"} name={"code"} />
              <Button type="primary" size="large" onClick={handleSubmitPassword}>
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
