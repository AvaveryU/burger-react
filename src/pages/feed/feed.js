//страница ленты заказов
import { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./feed.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { postNewUser } from "../../services/action/user.js";

export const FeedPage = () => {
  return (
    <>
      <main className={styles.app}></main>
    </>
  );
};
