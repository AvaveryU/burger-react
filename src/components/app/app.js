import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import appStyles from "./app.module.css";

import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";

import data from '../../utils/data.json'

const App = () => {
  return (
    <>
      <AppHeader />
    <main className={appStyles.app}>
      {/* <BurgerIngredients ingredients={dataBurgers}/> */}
      <BurgerIngredients ingredients={data}/>
      <BurgerConstructor ingredients={data}/>
    </main>
    </>
  );
};
export default App;

