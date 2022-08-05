//на странице /feed заказы
import styles from "./orderList.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { wsConnectionStart, wsCloseConnection } from "../../services/action/wsActions";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../orderItem/orderItem";
import { OPEN_ORDER_USERS_MODAL } from "../../services/action/details.js";

export const OrderList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.user);
  const pageOrdersProfile = useRouteMatch({ path: "/profile/orders", exact: true });

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsCloseConnection());
    };
  }, []);
  useEffect(() => {
    if (isLogin) {
      dispatch(wsConnectionStart());
    }
    return () => {
      dispatch(wsCloseConnection());
    };
  }, [dispatch, user]);
  const orders = useSelector((state) => state.wsData.orders);
  const ordersUser = useSelector((state) => state.wsAuth.orders);

  // открытие модалки состава заказа
  const handleOpenOrderUsers = () => {
    dispatch({ type: OPEN_ORDER_USERS_MODAL });
  };

  if (!orders) {
    return <p>Загружаем...</p>;
  } else {
    return (
      <>
        {/* если пользователь есть и находится на странице профиля, то брать массив заказов пользователя */}
        {(isLogin && user && pageOrdersProfile ? ordersUser : orders)?.map((order) => (
          // каждый заказ
          <Link
            to={{ pathname: `${location.pathname}/${order._id}`, state: { background: location } }}
            className={`${styles.order_link}`}
            key={order._id}
            onClick={handleOpenOrderUsers}
          >
            {/* детали каждого заказа */}
            <OrderItem order={order} />
          </Link>
        ))}
      </>
    );
  }
};
