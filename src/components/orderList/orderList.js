//на странице /feed заказы
import styles from "./orderList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import { useParams, Link, useLocation } from "react-router-dom";
import { getIngredientsData } from "../../services/action/ingredients.js";

const OrderList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const handlerOpenOrder = (event) => {
    event.preventDefault();
  };
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
    <Link
      to={{ pathname: `/feed/${ingredient._id}`, state: { background: location } }}
      className={`${styles.order_link}`}
    >
      <li className={`${styles.order_card} p-6 mb-4`} onClick={handlerOpenOrder}>
        <div className={`${styles.order_caption}`}>
          <p className={`text text_type_digits-default`}>#034535</p>
          <p className={`text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <p className={`${styles.order_info} text text_type_main-medium`}>Death Star Starship Main бургер</p>
        <div className={`${styles.order_ingredients}`}>
          {/* список иконок */}
          <div className={`${styles.order_iconsList}`}>
            <div className={`${styles.order_icons}`}>
              <img className={`${styles.order_image}`} src={ingredient?.image_mobile} alt={ingredient?.name} />
            </div>
            <div className={`${styles.order_icons}`}>
              <img className={`${styles.order_image}`} src={ingredient?.image_mobile} alt={ingredient?.name} />
            </div>
          </div>
          <div className={`${styles.order_price} ml-6`}>
            <p className={`${styles.ingredient__digits} text text_type_digits-default mr-2`}>{ingredient?.price}</p>
            <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} />
          </div>
        </div>
      </li>
    </Link>
  );
};
export default OrderList;
