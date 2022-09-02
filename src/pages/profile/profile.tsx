//страница с настройками профиля пользователя
import { useState, useEffect, FunctionComponent, FormEventHandler, ChangeEvent, SyntheticEvent } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./profile.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/store";
import { refreshUserInfo, logOutUser, getUserInfo } from "../../services/action/user";
import { OrderList } from "../../components/orderList/orderList";
import { useForm } from "../../hooks/useForm";

export const ProfilePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  //данные из хранилища о текущем пользователе
  const {
    user: { email, name },
    password,
  } = useSelector((state) => state.user);
  const [buttons, setShowButtons] = useState<boolean>(false);
  const { values, handleChange, setValues } = useForm({ password: password, email: email, name: name });

  //на странице сразу получим актуальные данные о пользователе
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const handleSubmitFormProfile: FormEventHandler = (event): void => {
    event.preventDefault();
    dispatch(refreshUserInfo(values.password, values.email, values.name));
    return setShowButtons(false);
  };
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setShowButtons(true);
  };

  const handleCancelFormProfile = (): void => {
    setValues({ password: password, email: email, name: name });
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
              onChange={(event) => handleChangeValue(event)}
              value={values.name || ""}
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              icon={"EditIcon"}
              onBlur={() => setValues(values)}
            />
            <Input
              onChange={(event) => handleChangeValue(event)}
              value={values.email || ""}
              type={"email"}
              placeholder={"Логин"}
              name={"email"}
              icon={"EditIcon"}
              onBlur={() => setValues(values)}
            />
            <Input
              onChange={(event) => handleChangeValue(event)}
              value={values?.password || ""}
              type={"text"}
              placeholder={"Пароль"}
              name={"password"}
              icon={"EditIcon"}
              onBlur={() => setValues(values)}
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
  );
};
