//страница восстановления пароля
import React from "react";
import { Link } from "react-router-dom";
import styles from "./forgot-password.module.css";
import AppHeader from "../../components/appHeader/appHeader";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPassword = () => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`forgot-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <Input onChange={onChange} value={value} type={"text"} placeholder={"Укажите e-mail"} name={"Email"} />
              <Button type="primary" size="large">
                Восстановить
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
