//страница заказа
import { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./orderId.module.css";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { wsConnectionStart, wsCloseConnection } from "../../services/action/wsActions";
import { getTimeStampString, getOrderStatus } from "../../utils/utils";

const OrderId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.wsData.orders);

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsCloseConnection());
    };
  }, []);

  const order = orders?.find((item) => item._id === id);

  //все ингредиенты сайта
  const allIngredients = useSelector((state) => state.ingredients.ingredients);

  //массив ингредиентов в заказе, найденных в общем списке ингредиентов
  const ingredientsInOrder = useMemo(
    () => order?.ingredients.map((ingredientInOrder) => allIngredients.find((item) => ingredientInOrder === item._id)),
    [order?.ingredients, allIngredients]
  );
  //новый массив ингредиентов в заказе без повторяющихся позиций
  const ingredientList = [...new Set(ingredientsInOrder)];

  //кол-во каждого ингредиента в заказе
  function counterIngredient(ingredientInOrder) {
    const data = ingredientsInOrder.filter((current) => current._id === ingredientInOrder._id);
    const counterIngredient = data.length;
    return counterIngredient;
  }
  const orderDate = getTimeStampString(order?.createdAt); //дата заказа
  const orderStatus = getOrderStatus(order?.status); //статус заказа

  const totalPrice = useMemo(() => {
    let price = 0;
    order?.ingredients.forEach((item) => {
      const ingri = allIngredients.find((ingredientInOrder) => ingredientInOrder._id === item);
      if (ingri?.price) {
        price += ingri.price;
      }
    });
    return price;
  }, [order?.ingredients]);

  return (
    <>
      <p className={`${styles.order_number} text text_type_digits-default`}>{`#${order?.number}`}</p>
      <p className={`text text_type_main-medium mt-10`}>{order?.name}</p>
      <p className={`${styles.order_status} text text_type_main-default mt-3`}>{orderStatus}</p>
      {/* список ингредиентов заказа */}
      <p className={`text text_type_main-medium mt-15 mb-6`}>Состав:</p>
      <ul className={`${styles.order_ingredients}`}>
        {ingredientList.map((ingredientInOrder, index) => (
          <li className={`${styles.order_item} mb-4 mr-6`} key={index}>
            <div className={`${styles.order_part}`}>
              <img
                className={`${styles.order_image}`}
                src={ingredientInOrder.image_mobile}
                alt={ingredientInOrder.name}
              />
              <p className={`text text_type_main-default ml-4`}>{ingredientInOrder.name}</p>
            </div>
            <div className={`${styles.order_part}`}>
              <p className={`${styles.order__digits} text text_type_digits-default mr-2 ml-4`}>
                {counterIngredient(ingredientInOrder)} x {ingredientInOrder.price}
              </p>
              <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.order_info} mt-10`}>
        <p className={`text text_type_main-default text_color_inactive`}>{orderDate}</p>
        <div className={`${styles.order_price} ml-6`}>
          <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
          <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} />
        </div>
      </div>
    </>
  );
};

export default OrderId;
