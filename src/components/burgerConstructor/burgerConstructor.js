import constructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement, DragIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, resetAfterOrder } from "../../services/action/constructorState";
import { postOrderBurger } from "../../services/action/order.js";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const BurgerConstructor = ({ onOpenModal }) => {
  const dispatch = useDispatch();
  const { data, bun } = useSelector((state) => state.constructorState);
  const ownId = uuidv4(); //собственный ID для булок

  //хук для подсчета цены ингредиентов
  const totalPrice = useMemo(() => {
    return (Object.keys(bun).length ? bun.price * 2 : 0) + data.reduce((s, v) => s + v.price, 0);
  }, [bun, data]);

  //функция для клика по кнопке
  const handleSendOrder = () => {
    onOpenModal(); //открыть модальное окно заказа
    //массив из id ингредиентов в конструкторе
    const IdIngredients = [bun._id, ...data.map((ingredient) => ingredient._id)];
    dispatch(postOrderBurger(IdIngredients)); //отправить данные о заказе
    dispatch(resetAfterOrder()); //очистка конструктора после заказа
  };

  const onDelete = (id) => {
    dispatch(deleteItem(id)); //удалить ингредиент по id при нажатии на корзину
  };

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
          price={bun.price} />
        ) : (
          <div className={`ml-2 mr-4 ${constructorStyles.constructor__bun_type_top} ${constructorStyles.constructor__element} text_type_main-medium`}>Выберите булку</div>
        )}
      </div>
      {/* список ингредиентов между булками */}
      <ul className={`${constructorStyles.constructor__list}`}>
        {data.length !== 0 ? (
          data.map((item, index) => (
            <li className={`${constructorStyles.constructor__element}`} key={item.id} index={index}>
              <div className={`${constructorStyles.constructor__dragIcon} mr-2`}>
                <DragIcon />
              </div>
              <ConstructorElement
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              handleClose={() => onDelete(item.id)} />
            </li>
          ))
        ) : (
          <li className={`ml-8 mr-2 ${constructorStyles.constructor__blank} ${constructorStyles.constructor__element} text_type_main-medium`}>Выберите начинку</li>
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
          price={bun.price} />
        ) : (
          <div className={`ml-2 mr-4 ${constructorStyles.constructor__bun_type_down} ${constructorStyles.constructor__element} text_type_main-medium`}>Выберите булку</div>
        )}
      </div>
      <div className={`${constructorStyles.constructor__button} mr-10 mt-10`}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <img className={`${constructorStyles.constructor__icon} mr-10`} src={CurrencyIcon} alt="иконка"></img>
        {/* отобразить активную кнопку только при условии наличия булки и хотя бы 1 ингредиента */}
        {data.length !== 0 && Object.keys(bun).length > 0 ? (
          <Button type="primary" size="large" onClick={handleSendOrder}>
            Оформить заказ
          </Button>
        ) : (
          <Button type="primary" size="large" disabled>
            Оформить заказ
          </Button>
        )}
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
