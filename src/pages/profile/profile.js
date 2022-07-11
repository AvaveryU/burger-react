//страница с настройками профиля пользователя
import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export const Profile = () => {
  //данные из хранилища о текущем пользователе
  const { user, password } = useSelector((state) => state.user);
  // стейты для редактирования данных о текущем пользователе (пока не рабочий функционал)
  const [isEmail, setEmail] = useState(user.email);
  const [isName, setName] = useState(user.name);
  const [isPassword, setPassword] = useState(password);
  // рефы для фокусировки поля
  const inputName = React.useRef("text");
  const inputEmail = React.useRef("email");
  const inputPassword = React.useRef("password");
  //функция при клике на иконку редактирования
  const onIconClick = useCallback(
    (data) => {
      if (inputName === data) {
        setTimeout(() => inputName.current.focus(), 0);
      } else if (inputEmail === data) {
        setTimeout(() => inputEmail.current.focus(), 0);
      } else if (inputPassword === data) {
        setTimeout(() => inputPassword.current.focus(), 0);
      }
    },
    [inputName, inputEmail, inputPassword]
  );

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
            <Input
              className={`mt-20`}
              onChange={(e) => setName(e.target.value)}
              onIconClick={() => onIconClick(inputName)}
              value={isName}
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              icon={"EditIcon"}
              ref={inputName}
            />
            <Input
              className={`mt-6`}
              onChange={(e) => setEmail(e.target.value)}
              onIconClick={() => onIconClick(inputEmail)}
              value={isEmail}
              type={"email"}
              placeholder={"Логин"}
              name={"email"}
              icon={"EditIcon"}
              ref={inputEmail}
            />
            <Input
              className={`mt-6`}
              onChange={(e) => setPassword(e.target.value)}
              onIconClick={() => onIconClick(inputPassword)}
              value={isPassword}
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
