//страница авторизации
import { FormEventHandler, FunctionComponent } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./login.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";
import { TLocationState } from "../../utils/types";
import { loginUser } from "../../services/action/user";
import { useForm } from "../../hooks/useForm";

export const LoginPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //данные о пытающемся войти пользователе
  const {
    user: { email },
    password,
    isLogin,
    loginUserError,
    message,
  } = useSelector((state) => state.user);

  const { values, handleChange, setValues } = useForm({ email: email, password: password });

  //диспатчим данные для авторизации при клике на "Войти"
  const handleLogin: FormEventHandler = (event): void => {
    event.preventDefault();
    setValues(values);
    dispatch(loginUser(values.password, values.email));
  };
  //если сработали флаги авторизации, перебросить на главную страницу
  if (isLogin) {
    return <Redirect to={(location.state as TLocationState)?.from || "/profile"} />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.login}>
        <div className={`${styles.wrapper}`}>
          <form name={`form`} id={`login-form`} className={`${styles.form}`} onSubmit={handleLogin}>
            <h2 className="text text_type_main-medium">Вход</h2>
            <Input
              onChange={handleChange}
              value={values?.email || ""}
              name={"email"}
              icon={"EditIcon"}
              placeholder={"E-mail"}
              onBlur={() => setValues(values)}
            />
            <PasswordInput name={"password"} onChange={handleChange} value={values?.password || ""} />
            <Button
              type="primary"
              size="large"
              disabled={values.email !== `` && values.password !== `` ? false : true}
              children="Войти"
              onClick={handleLogin}
            />
          </form>
        </div>
        {loginUserError && <span className={`${styles.error} text text_type_main-small`}>{message}</span>}
        <div className={`${styles.text} ml-2`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Вы — новый пользователь?
            <Link to={{ pathname: `/register` }} className={`${styles.link} ml-2`}>
              Зарегистрироваться
            </Link>
          </p>
          <p className={`text text_type_main-default text_color_inactive mt-4`}>
            Забыли пароль?
            <Link to={{ pathname: `/forgot-password` }} className={`${styles.link} ml-2`}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
