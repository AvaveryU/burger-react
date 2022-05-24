import constructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { TotalPriceContext } from "../../context/priceContext";

const BurgerConstructor = ({ onOpenModal }) => {
  const ingredients = useContext(BurgerIngredientsContext);
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);

  const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  const ingredientsBetweenBuns = ingredients.filter((ingredient) => ingredient.type !== `bun`);
console.log(ingredients)
  // хук для подсчета цены ингредиентов
  useEffect(() => {
    //пока что вручную посчитана сумма
    let total = (buns ? buns[0].price * 2 : 0) + ingredientsBetweenBuns.reduce((s, v) => s + v.price, 0);
    setTotalPrice(total);
  }, [ingredientsBetweenBuns, buns, setTotalPrice]);

  const handleOpenModal = (event) => {
    onOpenModal(event.currentTarget);
  };

  return (
    <div className={`${constructorStyles.constructor__box} mt-25 ml-4`}>
      <div className="ml-8">
        {buns.map((item, index) =>
        index === 0 &&
        <ConstructorElement type="top" isLocked={true} text={`${item.name} (верх)`} thumbnail={item.image_mobile} price={item.price} key={index} />)}
      </div>
      <ul className={`${constructorStyles.constructor__list}`}>
        {ingredientsBetweenBuns.map((item, index) => (
          <li className={`${constructorStyles.constructor__element}`} key={index}>
            <div className={`${constructorStyles.constructor__dragIcon} mr-2`}>
              <DragIcon />
            </div>
            <ConstructorElement isLocked={false} text={item.name} price={item.price} thumbnail={item.image_mobile} />
          </li>
        ))}
      </ul>
      <div className="ml-8">
        {buns.map((item, index) =>
        index === 0 &&
        <ConstructorElement type="bottom" isLocked={true} text={`${item.name} (низ)`} thumbnail={item.image_mobile} price={item.price} key={index} />)}
      </div>
      <div className={`${constructorStyles.constructor__button} mr-10 mt-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <img className={`${constructorStyles.constructor__icon} mr-10`} src={CurrencyIcon} alt="иконка"></img>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
//проверка передаваемых пропсов
 BurgerConstructor.propTypes = {
   onOpenModal: PropTypes.func.isRequired
 };
ConstructorElement.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
