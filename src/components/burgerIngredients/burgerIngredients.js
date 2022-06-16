import ingredientsStyles from "./burgerIngredients.module.css";
import IngredientsCategory from "../ingredientsCategory/ingredientsCategory";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = ({ onOpenModal }) => {
  const [tab, setCurrentTab] = useState("bun");
  //рефы для категорий ингридиентов
  const [bunRef, inViewBuns] = useInView({ threshold: 0 });
  const [sauseRef, inViewSauses] = useInView({ threshold: 0 });
  const [mainRef, inViewMains] = useInView({ threshold: 0 });

  // хук для скролла до определенной категории ингридиентов при клике
  const handleCLickTab = useCallback((tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }, []);
  // хук для подсветки определенной категории ингридиентов при скролле
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("bun");
    } else if (inViewSauses) {
      setCurrentTab("sauce");
    } else if (inViewMains) {
      setCurrentTab("main");
    }
  }, [inViewBuns, inViewSauses, inViewMains]);
  
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
        <span ref={bunRef} id='bun'>
          <IngredientsCategory type="bun" title="Булки" onOpenModal={onOpenModal}/>
        </span>
        <span ref={sauseRef} id='sauce'>
          <IngredientsCategory type="sauce" title="Соусы" onOpenModal={onOpenModal}/>
        </span>
        <span ref={mainRef} id='main'>
          <IngredientsCategory type="main" title="Начинки" onOpenModal={onOpenModal}/>
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
