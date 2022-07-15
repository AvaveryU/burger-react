//страница восстановления пароля
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEmail } from "../../services/action/user.js";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { user: { email }, isForgotPasswordChecked } = useSelector((state) => state.user);
  const location = useLocation();
  const [isEmail, setEmail] = useState(email);

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    dispatch(postEmail(isEmail)); //отправить данные о email
  };
//если сработал флаг сброса пароля, перебросить на страницу /reset-password
if (isForgotPasswordChecked) {
  return (<Redirect
    to={location.state?.from || '/reset-password'}
  />)
}
  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`forgot-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <Input onChange={onChange} value={isEmail} type={"text"} placeholder={"Укажите e-mail"} name={"Email"} />
              <Button type="primary" size="large" onClick={handleSendEmail} disabled={isEmail ? false : true }>
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
