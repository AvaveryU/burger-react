//страница с настройками профиля пользователя
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
  const [value, setValue] = React.useState("value");

  const inputName = React.useRef("text");
  const inputLogin = React.useRef("email");
  const inputPassword = React.useRef("password");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onIconClick = useCallback((data) => {
    if (data === "name") {
      console.log(data);
      setTimeout(() => inputName.current.focus(), 0);
    } else if (data === "email") {
      setTimeout(() => inputLogin.current.focus(), 0);
    } else if (data === "password") {
      setTimeout(() => inputPassword.current.focus(), 0);
    }
  }, []);

  return (
    <>
      <main className={styles.page}>
        <nav className={`${styles.profile} mr-15`}>
          <ul className={styles.list}>
            <li>
              <NavLink to={`/profile`} className={styles.navigation} activeClassName={styles.activeNavigationLink}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink to={`/profile/orders`} className={styles.navigation} activeClassName={styles.activeNavigationLink}>
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink to={`/login`} className={styles.navigation} activeClassName={styles.activeNavigationLink}>
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={`${styles.note} mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </nav>
        <div className={`${styles.wrapper}`}>
          <form name={`form`} id={`profile-form`} className={`${styles.form}`}>
            <Input className={`mt-20`} onChange={onChange} onIconClick={() => onIconClick("name")} value={value} type={"text"} placeholder={"Имя"} name={"name"} icon={"EditIcon"} ref={inputName} />
            <Input
              className={`mt-6`}
              onChange={onChange}
              onIconClick={() => onIconClick("email")}
              value={value}
              type={"email"}
              placeholder={"Логин"}
              name={"email"}
              icon={"EditIcon"}
              ref={inputLogin}
            />
            <Input
              className={`mt-6`}
              onChange={onChange}
              onIconClick={() => onIconClick("password")}
              value={value}
              type={"password"}
              placeholder={"Пароль"}
              name={"password"}
              icon={"EditIcon"}
              ref={inputPassword}
            />
          </form>
        </div>
      </main>
    </>
  );
};
