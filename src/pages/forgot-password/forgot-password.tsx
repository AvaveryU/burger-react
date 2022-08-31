//страница восстановления пароля
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, FunctionComponent } from "react";
import { TLocationState } from "../../utils/types";
import { useDispatch, useSelector } from "../../services/store";
import { postEmail } from "../../services/action/user";

export const ForgotPassword: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    user: { email },
    isForgotPasswordChecked,
  } = useSelector((state) => state.user);
  const location = useLocation();
  const [isEmail, setEmail] = useState<string>(email);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSendEmail = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(postEmail(isEmail)); //отправить данные о email
  };
  //если сработал флаг сброса пароля, перебросить на страницу /reset-password
  if (isForgotPasswordChecked) {
    return <Redirect to={(location.state as TLocationState)?.from || "/reset-password"} />;
  }
  return (
    <>
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.wrapper}`}>
            <form name={`form`} id={`forgot-form`} className={`${styles.form}`} onSubmit={handleSendEmail}>
              <h2 className="text text_type_main-medium">Восстановление пароля</h2>
              <Input onChange={onChange} value={isEmail} type={"text"} placeholder={"Укажите e-mail"} name={"Email"} />
              <Button type="primary" size="large" disabled={isEmail ? false : true} children="Восстановить" />
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
