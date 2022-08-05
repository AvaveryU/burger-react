//на странице /feed заказы
import styles from "./orderList.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { wsConnectionStart, wsCloseConnection } from "../../services/action/wsActions";
import { wsConnectionStartUser, wsCloseConnectionUser } from "../../services/action/wsActionsUser";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../orderItem/orderItem";
import { OPEN_ORDER_USERS_MODAL } from "../../services/action/details.js";
import { BURGER_API_WSS_ORDERS, getCookie } from "../../utils/utils";

export const OrderList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pageOrdersProfile = useRouteMatch({ path: "/profile/orders" });
  const accessToken = getCookie("token");
  useEffect(() => {
    pageOrdersProfile
      ? dispatch(wsConnectionStartUser(BURGER_API_WSS_ORDERS + `?token=${accessToken}`))
      : dispatch(wsConnectionStart());
    return () => {
      pageOrdersProfile ? dispatch(wsCloseConnectionUser()) : dispatch(wsCloseConnection());
    };
  }, [dispatch]);

  const orders = useSelector((state) => state.wsData.orders);
  const ordersUser = useSelector((state) => state.wsAuth.orders);

  // открытие модалки состава заказа
  const handleOpenOrderUsers = () => {
    dispatch({ type: OPEN_ORDER_USERS_MODAL });
  };

  if (!orders || !ordersUser) {
    return <p>Загружаем...</p>;
  }
  return (
    <>
      {/* если пользователь есть и находится на странице профиля, то брать массив заказов пользователя */}
      {(pageOrdersProfile ? ordersUser : orders).map((order) => (
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
};
