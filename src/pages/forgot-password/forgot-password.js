//страница восстановления пароля
import { Link } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { postEmail, setEmail } from "../../services/action/login.js";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.login);
  const onChange = (event) => {
    let inputEmail = event.target.value;
    dispatch(setEmail(inputEmail));
  };

  const handleSendEmail = () => {
    dispatch(postEmail(email)); //отправить данные о email
  };

  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`forgot-form`} className={`${styles.form}`}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <Input onChange={onChange} value={email} type={"text"} placeholder={"Укажите e-mail"} name={"Email"} />
              <Button type="primary" size="large" onClick={handleSendEmail}>
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
