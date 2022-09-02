//страница регистрации
import { FormEventHandler, FunctionComponent } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./register.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";
import { TLocationState } from "../../utils/types";
import { postNewUser } from "../../services/action/user";
import { useForm } from "../../hooks/useForm";

export const RegisterPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    user: { email, name },
    password,
    isRegisterChecked,
  } = useSelector((state) => state.user);

  const { values, handleChange, setValues } = useForm({ password: password, email: email, name: name });

  const handleRegisterUser: FormEventHandler = (event): void => {
    event.preventDefault();
    dispatch(postNewUser(values.password, values.name, values.email)); //диспатчим данные о новом пользователе
  };

  //если сработал флаг регистрации, перебросить на главную страницу
  if (isRegisterChecked) {
    return <Redirect to={(location.state as TLocationState)?.from || "/login"} />;
  }
  return (
    <main className={styles.page}>
      <div className={styles.register}>
        <div className={`${styles.wrapper}`}>
          <form name={`form`} id={`register-form`} className={`${styles.form}`} onSubmit={handleRegisterUser}>
            <h2 className="text text_type_main-medium">Регистрация</h2>
            <Input
              onChange={handleChange}
              value={values?.name || ""}
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              onBlur={() => setValues(values)}
            />
            <Input
              onChange={handleChange}
              value={values?.email || ""}
              type={"email"}
              placeholder={"E-mail"}
              name={"email"}
              onBlur={() => setValues(values)}
            />
            <PasswordInput onChange={handleChange} value={values?.password || ""} name={"password"} />
            <Button
              type="primary"
              size="medium"
              disabled={values.password !== `` && values.email !== `` && values.name !== `` ? false : true}
              children="Зарегистрироваться"
            />
          </form>
        </div>
        <div className={`${styles.text} ml-2`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Уже зарегистрированы?
            <Link to={{ pathname: `/login` }} className={`${styles.link} ml-2`}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
