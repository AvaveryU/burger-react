//на странице /feed заказы
import styles from "./orderList.module.css";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useCallback, useMemo } from "react";
import { wsConnectionStart, wsCloseConnection } from "../../services/action/wsActions";
import { useDispatch, useSelector } from "react-redux";
import { getTimeStampString, getOrderStatus } from "../../utils/utils";

const OrderList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsCloseConnection());
    };
  }, [dispatch]);
  const orders = useSelector((state) => state.wsData.orders);

  const handlerOpenOrder = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {orders.map((order) => (
        // каждый заказ
        <Link
          to={{ pathname: `${location.pathname}/${order._id}`, state: { background: location } }}
          className={`${styles.order_link}`}
          key={order._id}
        >
          {/* детали каждого заказа */}
          <OrderDetails order={order} />
        </Link>
      ))}
    </>
  );
};
export default OrderList;

//детали каждого заказа
const OrderDetails = ({ order }) => {
  const { name, number, createdAt, ingredients, status } = order;
  //все ингредиенты
  const allIngredients = useSelector((state) => state.ingredients.ingredients);

  //массив ингредиентов в заказе, найденных в общем списке ингредиентов
  const ingredientsInOrder = useMemo(
    () => ingredients.map((ingredientInOrder) => allIngredients.find((item) => ingredientInOrder === item._id)),
    [ingredients, allIngredients]
  );
  //массив из найденных ингредиентов в каждом заказе
  const ingredientData = useMemo(() => ingredientsInOrder.map((item) => item), [ingredientsInOrder]);

  const orderDate = getTimeStampString(createdAt);
  const orderStatus = getOrderStatus(status);

  const totalPrice = ingredients.reduce((previousValue, currentItem) => {
    const ingredient = allIngredients.find((item) => currentItem === item._id);

    if (!ingredient) {
      return previousValue;
    }
    return previousValue + ingredient.price;
  }, 0);
  const countItems = useMemo(() => {
    return ingredients.length - 6;
  }, [ingredients.length]);

  return (
    <li className={`${styles.order_card} p-6 mb-4`}>
      <div className={`${styles.order_caption}`}>
        <p className={`text text_type_digits-default`}>{`#` + number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{orderDate}</p>
      </div>
      <p className={`${styles.order_info} text text_type_main-medium`}>{name}</p>
      {status !== "Выполнен" ? (
        <p className="text text_type_main-default">{}</p>
      ) : (
        <p className={`text text_type_main-default `}>{orderStatus}</p>
      )}
      <div className={`${styles.order_ingredients}`}>
        {/* список иконок ингредиентов в заказе*/}
        <div className={`${styles.order_iconsList}`}>
          {ingredients.length && countItems <= 0
            ? ingredientData.map((ingredientInOrder, index) => (
                <div className={`${styles.order_icons}`} key={index}>
                  {ingredientInOrder && (
                    <img
                      className={`${styles.order_image}`}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  )}
                </div>
              ))
            : ingredientData.slice(0, 5).map((ingredientInOrder, index) => (
                <div className={`${styles.order_icons}`} key={index}>
                  {ingredientInOrder && countItems > 0 && (
                    <img
                      className={`${styles.order_image}`}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  )}
                  + {countItems}
                </div>
              ))}
        </div>
        <div className={`${styles.order_price} ml-6`}>
          <p className={`${styles.ingredient__digits} text text_type_digits-default mr-2`}>{totalPrice}</p>
          <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} alt={"картинка"} />
        </div>
      </div>
    </li>
  );
};
