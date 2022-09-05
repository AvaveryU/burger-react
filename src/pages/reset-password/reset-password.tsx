//страница сброса пароля
import { FormEventHandler, FunctionComponent } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./reset-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";
import { savePassword } from "../../services/action/user";
import { useForm } from "../../hooks/useForm";

export const ResetPassword: FunctionComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation<{ from: Location }>();
  const { password, token, isPasswordChecked } = useSelector((state) => state.user);

  const { values, handleChange, setValues } = useForm({ password: password, token: token });

  const handleSubmitPassword: FormEventHandler = (event): void => {
    event.preventDefault();
    dispatch(savePassword(values.password, values.token)); //диспатчить данные о email
  };
  //если сработал флаг изменения пароля, перебросить на /profile
  if (isPasswordChecked) {
    return <Redirect to={location.state?.from || "/profile"} />;
  }
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={`${styles.wrapper}`}>
          <form name={`form`} id={`reset_password-form`} className={`${styles.form}`} onSubmit={handleSubmitPassword}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <Input
              onChange={handleChange}
              value={values?.password || ""}
              placeholder={"Введите новый пароль"}
              name={"password"}
              type={"password"}
              onBlur={() => setValues(values)}
            />
            <Input
              onChange={handleChange}
              value={values?.token || ""}
              type={"text"}
              placeholder={"Введите код из письма"}
              name={"token"}
              onBlur={() => setValues(values)}
            />
            <Button
              type="primary"
              size="large"
              disabled={values.password !== `` && values.token !== `` ? false : true}
              children="Сохранить"
            />
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
