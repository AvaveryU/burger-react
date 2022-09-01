//страница восстановления пароля
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FunctionComponent } from "react";
import { TLocationState } from "../../utils/types";
import { useDispatch, useSelector } from "../../services/store";
import { postEmail } from "../../services/action/user";
import { useForm } from "../../hooks/useForm";

export const ForgotPassword: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    user: { email },
    isForgotPasswordChecked,
  } = useSelector((state) => state.user);
  const location = useLocation();

  const { values, handleChange, setValues } = useForm({ email: email });

  const handleSendEmail = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setValues(values);
    dispatch(postEmail(values.email)); //отправить данные о email
  };
  //если сработал флаг сброса пароля, перебросить на страницу /reset-password
  if (isForgotPasswordChecked) {
    return <Redirect to={(location.state as TLocationState)?.from || "/reset-password"} />;
  }
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={`${styles.wrapper}`}>
          <form name={`form`} id={`forgot-form`} className={`${styles.form}`} onSubmit={handleSendEmail}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <Input
              onChange={handleChange}
              value={values?.email}
              type={"text"}
              placeholder={"Укажите e-mail"}
              name={"email"}
              onBlur={() => setValues(values)}
            />
            <Button type="primary" size="large" disabled={values.email !== `` ? false : true} children="Восстановить" />
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
  );
};
