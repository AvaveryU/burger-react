import ingredientsStyles from "./burgerIngredients.module.css";
import IngredientsCategory from "../ingredientsCategory/ingredientsCategory";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";

const BurgerIngredients = ({ onOpenModal }) => {
  const [tab, setCurrentTab] = useState("bun");
  //рефы для категорий ингридиентов
  const bunRef = useRef("bun");
  const sauseRef = useRef("sauce");
  const mainRef = useRef("main");
  // функция для скролла до определенной категории ингридиентов
  const handleCLickTab = useCallback((event) => {
    if (event === "bun") {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (event === "sauce") {
      sauseRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (event === "main") {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentTab(event);
  }, []);
  return (
    <div className={`${ingredientsStyles.ingredients__box} mr-10 mt-10`}>
      <h1 className={`${ingredientsStyles.ingredients__title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div className={ingredientsStyles.ingredients__tab}>
        <Tab value="bun" active={tab === "bun"} onClick={handleCLickTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={tab === "sauce"} onClick={handleCLickTab}>
          Соусы
        </Tab>
        <Tab value="main" active={tab === "main"} onClick={handleCLickTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${ingredientsStyles.ingredients__category} mt-10`}>
        <span ref={bunRef}>
          <IngredientsCategory type="bun" title="Булки" onOpenModal={onOpenModal} />
        </span>
        <span ref={sauseRef}>
          <IngredientsCategory type="sauce" title="Соусы" onOpenModal={onOpenModal} />
        </span>
        <span ref={mainRef}>
          <IngredientsCategory type="main" title="Начинки" onOpenModal={onOpenModal} />
        </span>
      </div>
    </div>
  );
};

export default BurgerIngredients;
//проверка передаваемых пропсов
BurgerIngredients.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
