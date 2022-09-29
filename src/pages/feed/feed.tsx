//страница ленты заказов
import styles from "./feed.module.css";
import { OrderList } from "../../components/orderList/orderList";
import Stats from "../../components/stats/stats";
import { FunctionComponent } from "react";
import { useSelector } from "../../services/store";

export const FeedPage: FunctionComponent = () => {
  const orders = useSelector((state) => state.wsData.orders);

  return (
    <main className={styles.app}>
      <div className={`${styles.order_box} mt-10 mb-5`}>
        <h2 className={`text text_type_main-large mb-5`}>Лента&nbsp;заказов</h2>
        {/* список карточек с заказами */}
        <ul className={orders.length > 3 ? `${styles.order_list}` : `${styles.order_hidden}`}>
          <OrderList />
        </ul>
      </div>
      <Stats />
    </main>
  );
};
