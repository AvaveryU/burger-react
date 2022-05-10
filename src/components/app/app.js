import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import { useEffect, useState } from "react";
import URL from "../../utils/data.json";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const getIngredientsData = async () => {
      const response = await fetch(URL.baseURL);
      const data = await response.json();
      if (response.ok) {
        setIngredients(data.data);
      } else {
        return Promise.reject(
          `ошибка при запросе данных с сервера: ${response.status} (${response.statusText})`
        );
      }
    };
    getIngredientsData();
  }, []);
 
  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients ingredients={ingredients} /> 
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  );
};
export default App;
