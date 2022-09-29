import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FunctionComponent } from "react";
import { useHistory } from "react-router";
import styles from "./NotFound.module.css";
export const NotFoundPage: FunctionComponent = () => {
  const history = useHistory();
  const handleBackHome = () => {
    history.replace("/");
  };
  return (
    <main className={styles.page}>
      <span className="text text_type_main-large mb-8">Такой сраницы не существует! :(</span>
      <Button type="primary" size="large" children="Вернуться на главную страницу" onClick={handleBackHome} />
    </main>
  );
};
