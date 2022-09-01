//страница регистрации
import { useState, ChangeEvent, FormEventHandler, FunctionComponent } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./register.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";
import { TLocationState } from "../../utils/types";
import { postNewUser } from "../../services/action/user";

export const RegisterPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    user: { email, name },
    password,
    isRegisterChecked,
  } = useSelector((state) => state.user);
  // стейты для регистрации
  const [inputName, setName] = useState<string>(name);
  const [inputEmail, setEmail] = useState<string>(email);
  const [inputPassword, setPassword] = useState<string>(password);
  //функции для полей ввода
  const onRegisterName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onRegisterEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onRegisterPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleRegisterUser: FormEventHandler = (event): void => {
    event.preventDefault();
    dispatch(postNewUser(inputPassword, inputName, inputEmail)); //диспатчим данные о новом пользователе
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
            <Input onChange={onRegisterName} value={inputName} type={"text"} placeholder={"Имя"} name={"name"} />
            <Input onChange={onRegisterEmail} value={inputEmail} type={"email"} placeholder={"E-mail"} name={"email"} />
            <PasswordInput onChange={onRegisterPassword} value={inputPassword} name={"password"} />
            <Button
              type="primary"
              size="medium"
              disabled={inputName && inputEmail && inputPassword ? false : true}
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
