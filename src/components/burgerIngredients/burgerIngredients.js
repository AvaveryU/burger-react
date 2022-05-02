import ingredientsStyles from "./burgerIngredients.module.css";
import IngredientsCategory from "../ingredientsCategory/ingredientsCategory";
import { InfoIcon, CurrencyIcon, Counter, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ingredientPropType from '../../utils/prop-types.js';
import PropTypes from 'prop-types';
const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div className={`${ingredientsStyles.ingredients__box} mr-10 mt-10`}>
      <h1 className={`${ingredientsStyles.ingredients__title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${ingredientsStyles.ingredients__category} mt-10`}>
      <IngredientsCategory type="bun" ingredients={ingredients} title="Булки" />
      <IngredientsCategory type="sauce" ingredients={ingredients} title="Соусы" />
      <IngredientsCategory type="main" ingredients={ingredients} title="Начинки" />
      </div>
      {/* 
      <InfoIcon type="primary" /> */}
      {/* <Counter count={count} size="default" /> */}
    </div>
  );
};

export default BurgerIngredients;
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType)
}