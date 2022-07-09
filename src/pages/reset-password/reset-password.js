//страница сброса пароля
import React from "react";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPassword = () => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`reset_password-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <PasswordInput onChange={onChange} value={value} placeholder={"Введите новый пароль"} name={"password"} />
              <Input onChange={onChange} value={value} type={"text"} placeholder={"Введите код из письма"} name={"code"} />
              <Button type="primary" size="large">
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
