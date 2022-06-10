import constructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addBun, deleteItem, DELETE_INGREDIENT_CONSTRUCTOR } from "../../services/action/constructor";
import { postOrderBurger } from "../../services/action/order.js";
import { OPEN_ORDER_MODAL } from "../../services/action/details.js";
//import uuid from "react-uuid";

const BurgerConstructor = ({ onOpenModal }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);
  const { data, bun } = useSelector((state) => state.constructor);
  
  const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  const ingredientsBetweenBuns = ingredients.filter((ingredient) => ingredient.type !== `bun`);

  // хук для подсчета цены ингредиентов
  // useEffect(() => {
  //   //пока что вручную посчитана сумма
  //   let total = (buns ? buns[0].price * 2 : 0) + ingredientsBetweenBuns.reduce((s, v) => s + v.price, 0);
  //   setTotalPrice(total);
  // }, [ingredientsBetweenBuns, buns, setTotalPrice]);
  const totalPrice = useMemo(() => {
    return (
      // (buns ? buns.price * 2 : 0) +
      ingredientsBetweenBuns.reduce((s, v) => s + v.price, 0)
    );
  }, [ingredientsBetweenBuns, buns]);
  
  const handleSendOrder = () => {
    onOpenModal();
    const IdIngredient = ingredients.map((ingredient) => ingredient._id);
    // if (ingredients) IdIngredient.push(IdIngredient._id);
    dispatch(postOrderBurger(IdIngredient));
  };
  const onDelete = (id) => {
    console.log(id)
    dispatch(deleteItem(id))
  };
    
  return (
    <div className={`${constructorStyles.constructor__box} mt-25 ml-4`}>
      <div className="ml-8">
        {buns.length ? buns.map((item, index) => index === 0 &&
        <ConstructorElement
        type="top"
        isLocked={true}
        text={`${item.name} (верх)`}
        thumbnail={item.image_mobile}
        price={item.price} key={item._id}
        index={index} />
        ) : (
          <div className={`ml-2 mr-4 ${constructorStyles.constructor__bun_type_top} ${constructorStyles.constructor__element } text_type_main-medium`}>Выберите булки</div>
        )}
      </div>
      <ul className={`${constructorStyles.constructor__list}`}>
        {ingredientsBetweenBuns.length ? (
          ingredientsBetweenBuns.map((item, index) => (
            <li className={`${constructorStyles.constructor__element}`} key={item._id} id={item._id} index={index}>
              <div className={`${constructorStyles.constructor__dragIcon} mr-2`}>
                <DragIcon />
              </div>
              <ConstructorElement isLocked={false} text={item.name} price={item.price} thumbnail={item.image_mobile} handleClose={() => onDelete(item._id)} />
            </li>
          ))
        ) : (
          <li className={`ml-8 mr-2 ${constructorStyles.constructor__blank} ${constructorStyles.constructor__element} text_type_main-medium`}>
            Выберите начинку
          </li>
        )}
      </ul>
      <div className="ml-8">
        {buns.length ? buns.map((item, index) => index === 0 &&
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${item.name} (низ)`}
        thumbnail={item.image_mobile}
        price={item.price}
        key={item._id}
        index={index} />
        ) : (
          <div className={`ml-2 mr-4 ${constructorStyles.constructor__bun_type_down} ${constructorStyles.constructor__element } text_type_main-medium`}>Выберите булки</div>
        )}
      </div>
      <div className={`${constructorStyles.constructor__button} mr-10 mt-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <img className={`${constructorStyles.constructor__icon} mr-10`} src={CurrencyIcon} alt="иконка"></img>
        <Button type="primary" size="large" onClick={handleSendOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
//проверка передаваемых пропсов
BurgerConstructor.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
ConstructorElement.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
