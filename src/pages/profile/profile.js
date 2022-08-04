//страница с настройками профиля пользователя
import React, { useCallback, useState, useEffect } from "react";
import { NavLink, useRouteMatch, Link, useLocation, useParams } from "react-router-dom";
import styles from "./profile.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { refreshUserInfo, logOutUser, getUserInfo } from "../../services/action/user";
import { OrderList } from "../../components/orderList/orderList";
import { wsConnectionStart, wsConnectionClosed } from "../../services/action/wsActions";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  //данные из хранилища о текущем пользователе
  const { user, password } = useSelector((state) => state.user);
  // стейты для редактирования данных о текущем пользователе (пока не рабочий функционал)
  const [inputEmail, setEmail] = useState(user.email);
  const [inputName, setName] = useState(user.name);
  const [inputPassword, setPassword] = useState("");
  const [buttons, setShowButtons] = useState(false);
  // рефы для фокусировки поля
  const refName = React.useRef("text");
  const refEmail = React.useRef("email");
  const refPassword = React.useRef("password");
  //на странице сразу получим актуальные данные о пользователе
  useEffect(() => {
    dispatch(getUserInfo());
    // dispatch(wsConnectionStart());
    // return () => {
    //   dispatch(wsConnectionClosed());
    // };
  }, [dispatch]);
  //функция при клике на иконку редактирования
  const onIconClick = useCallback(
    (data) => {
      if (refName === data) {
        setTimeout(() => refName.current.focus(), 0);
      } else if (refEmail === data) {
        setTimeout(() => refEmail.current.focus(), 0);
      } else if (refPassword === data) {
        setTimeout(() => refPassword.current.focus(), 0);
      }
    },
    [refName, refEmail, refPassword]
  );
  const handleSubmitFormProfile = (event) => {
    event.preventDefault();
    dispatch(refreshUserInfo(inputPassword, inputEmail, inputName));
    return setShowButtons(false);
  };

  const handleCancelFormProfile = () => {
    setEmail(user.email);
    setName(user.name);
    setPassword(password);
    setShowButtons(false);
  };
  //выход из ЛК
  const logOut = (event) => {
    event.preventDefault();
    dispatch(logOutUser());
  };
  const pageProfile = useRouteMatch({ path: "/profile", exact: true });
  const pageOrdersProfile = useRouteMatch({ path: "/profile/orders", exact: true });

  return (
    <>
      <main className={styles.page}>
        <nav className={`${styles.profile} mr-15`}>
          <ul className={styles.list}>
            <li>
              <NavLink
                to={`/profile`}
                exact={true}
                className={styles.navigation}
                activeClassName={styles.activeNavigationLink}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile/orders`}
                exact={true}
                className={styles.navigation}
                activeClassName={styles.activeNavigationLink}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/login`}
                exact={true}
                className={styles.navigation}
                activeClassName={styles.activeNavigationLink}
                onClick={logOut}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={`${styles.note} mt-20`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </nav>
        {/* пользователь на странице /profile */}
        {pageProfile && (
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`profile-form`} className={`${styles.form}`} onSubmit={handleSubmitFormProfile}>
              <Input
                className={`mt-20`}
                onChange={(e) => {
                  setName(e.target.value);
                  setShowButtons(true);
                }}
                onIconClick={() => onIconClick(refName)}
                value={inputName || ""}
                type={"text"}
                placeholder={"Имя"}
                name={"name"}
                icon={"EditIcon"}
                ref={refName}
              />
              <Input
                className={`mt-6`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowButtons(true);
                }}
                onIconClick={() => onIconClick(refEmail)}
                value={inputEmail || ""}
                type={"email"}
                placeholder={"Логин"}
                name={"email"}
                icon={"EditIcon"}
                ref={refEmail}
              />
              <Input
                className={`mt-6`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowButtons(true);
                }}
                onIconClick={() => onIconClick(refPassword)}
                value={inputPassword || ""}
                type={"password"}
                placeholder={"Пароль"}
                name={"password"}
                icon={"EditIcon"}
                ref={refPassword}
              />
              {buttons ? (
                <div className={`${styles.buttons}`}>
                  <Button type="secondary" size="medium" onClick={handleCancelFormProfile}>
                    Отмена
                  </Button>
                  <Button type="primary" size="medium">
                    Сохранить
                  </Button>
                </div>
              ) : (
                <span></span>
              )}
            </form>
          </div>
        )}
        {/* пользователь на странице /profile/orders */}
        {pageOrdersProfile && (
          <ul className={`${styles.order_list}`}>
            <OrderList />
          </ul>
        )}
      </main>
    </>
  );
};
