//страница заказа
import { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./orderId.module.css";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import { useDispatch, useSelector } from "react-redux";

const OrderId = () => {
  const ingredients = [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0,
    },
  ];
  const ingredient = ingredients.find((ingredient) => ingredient._id === "60666c42cc7b410027a1a9b5");

  return (
    <>
      <span className={`${styles.order_card}`}>
        <p className={`${styles.order_number} text text_type_digits-default`}>#034535</p>
        <p className={`text text_type_main-medium mt-10`}>Death Star Starship Main бургер</p>
        <p className={`${styles.order_status} text text_type_main-default mt-3`}>Выполнен</p>
        {/* список ингредиентов заказа */}
        <p className={`text text_type_main-medium mt-15`}>Состав:</p>
        <ul className={`${styles.order_ingredients}`}>
          <li className={`${styles.order_item} mt-6 mb-4 mr-6`}>
            <div className={`${styles.order_part}`}>
              <img className={`${styles.order_image}`} src={ingredient?.image_mobile} alt={ingredient?.name} />
              <p className={`text text_type_main-default ml-4`}>{ingredient?.name}</p>
            </div>
            <div className={`${styles.order_part}`}>
              <p className={`${styles.order__digits} text text_type_digits-default mr-2 ml-4`}>{ingredient?.price}</p>
              <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} />
            </div>
          </li>
        </ul>
        <div className={`${styles.order_info} mt-10`}>
          <p className={`text text_type_main-default text_color_inactive`}>Вчера, 13:50 i-GMT+3</p>
          <div className={`${styles.order_price} ml-6`}>
            <p className={`text text_type_digits-default mr-2`}>{ingredient?.price}</p>
            <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} />
          </div>
        </div>
      </span>
    </>
  );
};

export default OrderId;
