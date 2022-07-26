//страница ленты заказов
import { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./feed.module.css";
import OrderList from "../../components/orderList/orderList";
import Stats from "../../components/stats/stats";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { postNewUser } from "../../services/action/user.js";

export const FeedPage = () => {
  return (
    <>
      <main className={styles.app}>
        <div className={`${styles.order_box} mt-10 mb-5`}>
          <h2 className={`text text_type_main-large mb-5`}>Лента&nbsp;заказов</h2>
          {/* список карточек с заказами */}
          <ul className={`${styles.order_list}`}>
            <OrderList />
          </ul>
        </div>
        <Stats />
      </main>
    </>
  );
};
