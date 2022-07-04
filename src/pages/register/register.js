//страница регистрации
import React from "react";
import { useHistory, useLocation, useRouteMatch, Link } from "react-router-dom";
import styles from "./register.module.css";
import AppHeader from "../../components/appHeader/appHeader";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const RegisterPage = () => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <AppHeader />
      <main className={styles.page}>
        <div className={styles.register}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`register-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Регистрация</h2>
              <Input
                className={`mt-20`}
                onChange={onChange}
                value={value}
                type={"text"}
                placeholder={"Имя"}
                name={"name"}
              />
              <Input
                className={`mt-6`}
                onChange={onChange}
                value={value}
                type={"email"}
                placeholder={"E-mail"}
                name={"email"}
              />
              <PasswordInput
                className={`mt-6`}
                onChange={onChange}
                value={value}
                name={"password"}
              />
              <Button type="primary" size="medium">
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
