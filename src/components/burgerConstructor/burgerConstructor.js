import constructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, resetAfterOrder } from "../../services/action/constructorState";
import { postOrderBurger } from "../../services/action/order";
import { useDrop } from "react-dnd";
import ConstructorIngredient from "../constructorIngredient/constructorIngredient";
import { useHistory } from "react-router-dom";

const BurgerConstructor = ({ onOpenModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, bun } = useSelector((state) => state.constructorState);
  const { isLogin, isAuthChecked } = useSelector((state) => state.user);
  //хук для подсчета цены ингредиентов
  const totalPrice = useMemo(() => {
    return (Object.keys(bun).length ? bun.price * 2 : 0) + data.reduce((s, v) => s + v.price, 0);
  }, [bun, data]);

  //функция для клика по кнопке
  const handleSendOrder = () => {
    if (isAuthChecked) {
      onOpenModal(); //открыть модальное окно заказа
      //массив из id ингредиентов в конструкторе
      const idIngredients = [bun._id, bun._id, ...data.map((ingredient) => ingredient._id)];
      dispatch(postOrderBurger(idIngredients)); //отправить данные о заказе
      dispatch(resetAfterOrder()); //очистка конструктора после заказа
    }
    if (!isAuthChecked || !isLogin) {
      history.push("/login");
    }
  };

  const onDelete = (id) => {
    dispatch(deleteItem(id)); //удалить ингредиент по id при нажатии на корзину
  };

  //хук для области перетаскивания - конструктор
  const [, drop] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addItem(item));
    },
  });

  return (
    // булка верхняя
    <div className={`${constructorStyles.constructor__box} mt-25 ml-4`} ref={drop}>
      <div className="ml-8" key={bun.ownId}>
        {Object.keys(bun).length > 0 ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        ) : (
          <div
            className={`ml-2 mr-4 ${constructorStyles.constructor__bun_type_top} ${constructorStyles.constructor__element} text_type_main-medium`}
          >
            Выберите булку
          </div>
        )}
      </div>
      {/* список ингредиентов между булками */}
      <ul className={`${constructorStyles.constructor__list}`}>
        {data.length !== 0 ? (
          data.map((item, index) => (
            <ConstructorIngredient key={item.id} index={index} item={item} handleClose={() => onDelete(item.id)} />
          ))
        ) : (
          <li
            className={`ml-8 mr-2 ${constructorStyles.constructor__blank} ${constructorStyles.constructor__element} text_type_main-medium`}
          >
            Выберите начинку
          </li>
        )}
      </ul>
      {/* булка нижняя */}
      <div className="ml-8" key={bun.ownId}>
        {Object.keys(bun).length > 0 ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        ) : (
          <div
            className={`ml-2 mr-4 ${constructorStyles.constructor__bun_type_down} ${constructorStyles.constructor__element} text_type_main-medium`}
          >
            Выберите булку
          </div>
        )}
      </div>
      <div className={`${constructorStyles.constructor__button} mr-10 mt-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <img className={`${constructorStyles.constructor__icon} mr-10`} src={CurrencyIcon} alt="иконка"></img>
        {/* отобразить активную кнопку только при условии наличия булки и хотя бы 1 ингредиента */}
        <Button
          type="primary"
          size="large"
          onClick={handleSendOrder}
          disabled={data.length !== 0 && Object.keys(bun).length > 0 ? false : true}
        >
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
