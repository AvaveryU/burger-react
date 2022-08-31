//страница с настройками профиля пользователя
import React, {
  useCallback,
  useState,
  useEffect,
  FunctionComponent,
  FormEventHandler,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../utils/types";
import { refreshUserInfo, logOutUser, getUserInfo } from "../../services/action/user";
import { OrderList } from "../../components/orderList/orderList";

export const ProfilePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  //данные из хранилища о текущем пользователе
  const {
    user: { email, name },
    password,
  } = useSelector((state) => state.user);
  // стейты для редактирования данных о текущем пользователе (пока не рабочий функционал)
  const [inputEmail, setEmail] = useState<string>(email);
  const [inputName, setName] = useState<string>(name);
  const [inputPassword, setPassword] = useState<string>("");
  const [buttons, setShowButtons] = useState<boolean>(false);
  // рефы для фокусировки поля
  const refName = React.useRef<any>("text");
  const refEmail = React.useRef<any>("email");
  const refPassword = React.useRef<any>("password");

  //на странице сразу получим актуальные данные о пользователе
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  //функция при клике на иконку редактирования
  const onIconClick = useCallback(
    (data: any) => {
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
  const handleSubmitFormProfile: FormEventHandler = (event): void => {
    event.preventDefault();
    dispatch(refreshUserInfo(inputPassword, inputEmail, inputName));
    return setShowButtons(false);
  };
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === `text`) {
      setName(event.target.value);
    }
    if (event.target.type === `email`) {
      setEmail(event.target.value);
    }
    if (event.target.type === `password`) {
      setPassword(event.target.value);
    }
    setShowButtons(true);
  };
  const handleCancelFormProfile = (): void => {
    setEmail(email);
    setName(name);
    setPassword(password);
    setShowButtons(false);
  };
  //выход из ЛК
  const logOut = (event: SyntheticEvent) => {
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
                onChange={handleChangeValue}
                onIconClick={() => onIconClick(refName)}
                value={inputName || ""}
                type={"text"}
                placeholder={"Имя"}
                name={"name"}
                icon={"EditIcon"}
                ref={refName}
              />
              <Input
                onChange={handleChangeValue}
                onIconClick={() => onIconClick(refEmail)}
                value={inputEmail || ""}
                type={"email"}
                placeholder={"Логин"}
                name={"email"}
                icon={"EditIcon"}
                ref={refEmail}
              />
              <Input
                onChange={handleChangeValue}
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
                  <Button type="secondary" size="medium" onClick={handleCancelFormProfile} children="Отмена" />
                  <Button type="primary" size="medium" children="Сохранить" />
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
