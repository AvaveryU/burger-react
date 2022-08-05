import styles from "./orderItem.module.css";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getTimeStampString, getOrderStatus } from "../../utils/utils";
import { useRouteMatch } from "react-router-dom";

//детали каждого заказа
const OrderItem = ({ order }) => {
  const pageOrdersProfile = useRouteMatch({ path: "/profile/orders", exact: true });
  const { name, number, createdAt, ingredients, status } = order;

  //все ингредиенты сайта
  const allIngredients = useSelector((state) => state.ingredients.ingredients);

  //массив ингредиентов в заказе, найденных в общем списке ингредиентов
  const ingredientsInOrder = useMemo(
    () => ingredients.map((ingredientInOrder) => allIngredients.find((item) => ingredientInOrder === item._id)),
    [ingredients, allIngredients]
  );

  //массив из найденных ингредиентов в каждом заказе
  const ingredientData = useMemo(() => ingredientsInOrder.map((item) => item), [ingredientsInOrder]);

  const orderDate = getTimeStampString(createdAt); //дата заказа
  const orderStatus = getOrderStatus(status); //статус заказа

  const totalPrice = useMemo(() => {
    let price = 0;
    ingredients.forEach((item) => {
      const ingri = allIngredients.find((ingredientInOrder) => ingredientInOrder._id === item);
      if (ingri?.price) {
        price += ingri.price;
      }
    });
    return price;
  }, [ingredients]);

  const countItems = useMemo(() => {
    return ingredients.length - 6;
  }, [ingredients.length]);

  return (
    <>
      <li className={`${styles.order_card} ${pageOrdersProfile ? styles.order_user : ``} p-6 mb-4`}>
        <div className={`${styles.order_caption}`}>
          <p className={`text text_type_digits-default`}>{`#` + number}</p>
          <p className={`text text_type_main-default text_color_inactive`}>{orderDate}</p>
        </div>
        <p className={`${styles.order_info} text text_type_main-medium`}>{name}</p>
        {pageOrdersProfile ? (
          <p className={`text text_type_main-default ${status === "done" ? styles.order_status : ""} `}>
            {orderStatus}
          </p>
        ) : null}
        <div className={`${styles.order_ingredients} mt-6`}>
          {/* список иконок ингредиентов в заказе*/}
          <div className={`${styles.order_iconsList}`}>
            {/* если ингредиентов больше 7 штук, то добавляем счетчик */}
            {ingredients.length > 6 && (
              <div className={`${styles.order_icons} `}>
                <span className={`text text_type_main-default ${styles.order_count}`}>{`+${countItems}`}</span>
                {ingredientData.slice(5, 6).map((ingredientInOrder) => {
                  ingredientInOrder && (
                    <img
                      className={`${styles.order_image}`}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  );
                })}
              </div>
            )}
            {/* если ингредиентов до 6 штук включительно */}
            {ingredients.length <= 5 &&
              ingredientData.map((ingredientInOrder, index) => (
                <div className={`${styles.order_icons}`} key={index}>
                  {ingredientInOrder && (
                    <img
                      className={`${styles.order_image}`}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  )}
                </div>
              ))}
            {/* если ингредиентов больше 6 штук, то разметка для этих 6 штук */}
            {ingredients.length > 5 &&
              ingredientData.slice(0, 5).map((ingredientInOrder, index) => (
                <div className={`${styles.order_icons}`} key={index}>
                  {ingredientInOrder && (
                    <img
                      className={`${styles.order_image}`}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  )}
                </div>
              ))}
          </div>
          <div className={`${styles.order_price} ml-6`}>
            <p className={`${styles.ingredient__digits} text text_type_digits-default mr-2`}>{totalPrice}</p>
            <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} alt={"картинка"} />
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderItem;
