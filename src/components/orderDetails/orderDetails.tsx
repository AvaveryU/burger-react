import orderStyles from "./orderDetails.module.css";
import DoneInPopup from "../../images/DoneInPopup.svg";
import { useSelector, RootState } from "../../services/store";
import { FunctionComponent } from "react";

const OrderDetails: FunctionComponent = () => {
  const { order } = useSelector((state: RootState) => state.order); // данные о заказе

  return (
    <div className={orderStyles.order__data}>
      {order.number === null ? (
        <p className={`${orderStyles.order__text} text text_type_main-medium mb-2`}>ожидайте номер заказа...</p>
      ) : (
        <p className={`${orderStyles.order__number} text text_type_digits-large`}>{order.number}</p>
      )}
      <p className={`${orderStyles.order__identifier} text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img className="mt-15 mb-15" src={DoneInPopup} alt="галка"></img>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
