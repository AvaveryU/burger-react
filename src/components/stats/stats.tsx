//на странице /feed статистика заказов
import styles from "./stats.module.css";
import { useSelector } from "../../utils/types";
import { FunctionComponent } from "react";

const Stats: FunctionComponent = () => {
  const { total, totalToday, orders } = useSelector((state) => state.wsData);
  //массив выполненных заказов
  const doneOrders = orders.filter((item) => item.status === "done");
  //массив заказов в работе
  const notDoneOrders = orders.filter((item) => item.status !== "done");
  return (
    <div className={`${styles.stats_box} ml-15 mt-25`}>
      <div className={`${styles.stats_boards}`}>
        <span className={`text text_type_main-medium`}>Готовы:</span>
        <span className={`text text_type_main-medium`}>В работе:</span>
        <ul className={`${styles.stats_done}`}>
          {doneOrders.map((item) => (
            <li key={item._id} className={`${styles.stats_item} text text_type_digits-default mb-2`}>
              {item.number}
            </li>
          ))}
        </ul>
        <ul className={`${styles.stats_inwork}`}>
          {notDoneOrders.map((item) => (
            <li key={item._id} className={`text text_type_digits-default mb-2`}>
              {item.number}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.stats_completed}`}>
        <span className={`text text_type_main-medium`}>Выполнено за все время:</span>
        <span className={`${styles.stats_digits} text text_type_digits-large`}>{total}</span>
      </div>
      <div className={`${styles.stats_completed}`}>
        <span className={`text text_type_main-medium`}>Выполнено за сегодня:</span>
        <span className={`${styles.stats_digits} text text_type_digits-large`}>{totalToday}</span>
      </div>
    </div>
  );
};
export default Stats;
