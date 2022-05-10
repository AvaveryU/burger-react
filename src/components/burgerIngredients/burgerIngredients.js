import ingredientsStyles from "./burgerIngredients.module.css";
import IngredientsCategory from "../ingredientsCategory/ingredientsCategory";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import ingredientPropType from "../../utils/prop-types.js";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("bun");
  const handleCLickTab = (event) => {
    setCurrent(event);
  };
  return (
    <div className={`${ingredientsStyles.ingredients__box} mr-10 mt-10`}>
      <h1 className={`${ingredientsStyles.ingredients__title} text text_type_main-large mb-5`}>
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={handleCLickTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={handleCLickTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={handleCLickTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${ingredientsStyles.ingredients__category} mt-10`}>
        <IngredientsCategory type="bun" ingredients={ingredients} title="Булки" />
        <IngredientsCategory type="sauce" ingredients={ingredients} title="Соусы" />
        <IngredientsCategory type="main" ingredients={ingredients} title="Начинки" />
      </div>
    </div>
  );
};

export default BurgerIngredients;
//проверка передаваемых пропсов
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
