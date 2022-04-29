import ingredientsStyles from "./burgerIngredients.module.css";
import { InfoIcon, CurrencyIcon, Counter, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
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
      <IngredientsCategory type="bun" ingredients={ingredients} title="Булки" />
      <IngredientsCategory type="sauce" ingredients={ingredients} title="Соусы" />
      <IngredientsCategory type="main" ingredients={ingredients} title="Начинки" />
      {/* <CurrencyIcon type="primary" />
      <InfoIcon type="primary" /> */}
      {/* <Counter count={count} size="default" /> */}
    </div>
  );
};

const IngredientsCategory = ({ type, title, ingredients }) => {
  const category = ingredients.filter((ingredient) => ingredient.type === `${type}`);
  console.log(category);
  return (
    <>
      <h3 className={`${ingredientsStyles.ingredient__title} m-0`}>{title}</h3>
      <ul className={`${ingredientsStyles.ingredient__ul} mt-10 ml-4 mb-0`}>
        {category.map((ingredient) => (
          <BurgerIngredient ingredient={ingredient} type={type} key={ingredient._id} />
        ))}
      </ul>
    </>
  );
};

const BurgerIngredient = ({ ingredient }) => {
  return (
    <li className={`${ingredientsStyles.ingredient__li} mt-6`}>
      <img src={ingredient.image} alt={ingredient.name} key={ingredient._id} />
      <div>
        <p className={`${ingredientsStyles.ingredient__price}`}>{ingredient.price}</p>
        <p className={`${ingredientsStyles.ingredient__name}`}>{ingredient.name}</p>
      </div>
    </li>
  );
};

export default BurgerIngredients;
