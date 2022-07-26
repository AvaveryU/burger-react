//на странице /feed заказы
import styles from "./orderList.module.css";
import { useSelector } from "react-redux";
import CurrencyIcon from "../../images/CurrencyIcon.svg";

const OrderList = () => {
  const handlerOpenOrder = (event) => {
    event.preventDefault();
  };
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredient = ingredients.find((ingredient) => ingredient._id);
  return (
    <>
      <div className={`${styles.order_box} mt-10 mb-5`}>
        <h2 className={`text text_type_main-large mb-5`}>Лента&nbsp;заказов</h2>
        <div className={`${styles.order_list}`}>
          <div className={`${styles.order_card} p-6`} onClick={handlerOpenOrder}>
            <div className={`${styles.order_caption}`}>
              <p className={`text text_type_digits-default`}>#034535</p>
              <p className={`text text_type_main-default text_color_inactive`}>
                Сегодня, 16:20 i-GMT+3
              </p>
            </div>
            <p className={`${styles.order_info} text text_type_main-medium`}>
              Death Star Starship Main бургер
            </p>
            <div className={`${styles.order_ingredients}`}>
              {/* список иконок */}
              <div className={`${styles.order_iconsList}`}>
                <div className={`${styles.order_icons}`}>
                  <img
                    className={`${styles.order_image}`}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                </div>
                <div className={`${styles.order_icons}`}>
                  <img
                    className={`${styles.order_image}`}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                </div>
              </div>
              <div className={`${styles.order_price} ml-6`}>
                <p className={`${styles.ingredient__digits} text text_type_digits-default mr-2`}>
                  {ingredient.price}
                </p>
                <img className={`${styles.order_iconPrice}`} src={CurrencyIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderList;
