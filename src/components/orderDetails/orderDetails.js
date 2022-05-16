import orderStyles from "./orderDetails.module.css";
import DoneInPopup from "../../images/DoneInPopup.svg";

const OrderDetails = () => {
  return (
    <div className={orderStyles.order__data}>
      <p className={`${orderStyles.order__number} text text_type_digits-large`}>034536</p>
      <p className={`${orderStyles.order__identifier} text text_type_main-medium mt-8`}>
        идентификатор заказа
      </p>
      <img className="mt-15 mb-15" src={DoneInPopup}></img>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
