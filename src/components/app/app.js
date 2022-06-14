import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import INFO from "../../utils/data.json";

import { postOrderBurger } from "../../services/action/order.js";
import { getIngredientsData } from "../../services/action/ingredients.js";
import { CLOSE_MODAL, OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL } from "../../services/action/details.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const { ingredients, isLoading, error } = useSelector((state) => state.ingredients);
  const { isOrderDetailsOpened, isIngredientDetailsOpened, ingredientInModal } = useSelector((state) => state.details);
  //const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки - заказ
  //const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки - ингредиент
  //const [ingredientInModal, setIngredientInModal] = useState({}); // карточка с ингредиентом

  const isOrder = useSelector((state) => state.order);
  const [totalPrice, setTotalPrice] = useState(null); //стейт для стоимости заказа

  const dispatch = useDispatch();

  // хук для получения данных с сервера
  useEffect(() => {
    // const urlIngredients = "ingredients";
    // const getIngredientsData = async () => {
    //   const response = await fetch(INFO.baseURL + urlIngredients, {
    //     method: "GET",
    //   });
    //   const data = await checkResponse(response);
    //   setIngredients(data.data);
    // };
    // getIngredientsData().catch((error) => console.log(error));

    //отправляем экшен creator и получаем ингредиенты
    dispatch(getIngredientsData());
  }, [dispatch]);

  // функция для отправки данных на сервер
  // const postOrderDetails = () => {
  //   const urlOrders = "orders";
  //   fetch(INFO.baseURL + urlOrders, {
  //     method: "POST",
  //     headers: INFO.headers,
  //     body: JSON.stringify({
  //       ingredients: ["60d3b41abdacab0026a733c6"],
  //     }),
  //   })
  //     .then(checkResponse)
  //     .then((isOrderNumber) => {
  //       setOrderDetails(isOrderNumber);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // Закрытие всех модалок
  const closeAllModals = useCallback(() => {
    dispatch({ type: CLOSE_MODAL });
  }, [dispatch]);
  // открытие окна с ингредиентом
  const handleOpenIngredientDetails = useCallback(
    (idIngredient) => {
      dispatch({
        type: OPEN_INGREDIENT_MODAL,
        payload: ingredients.find((ingredient) => ingredient._id === idIngredient),
      });
    },
    [dispatch, ingredients]
  );
  // открытие окна заказа
  const handleOpenOrder = useCallback(() => {
    dispatch({ type: OPEN_ORDER_MODAL });
  }, [dispatch]);

  if (error || isLoading) {
    return null;
  }
  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.app}>
          <BurgerIngredients onOpenModal={handleOpenIngredientDetails} />
          <BurgerConstructor onOpenModal={handleOpenOrder} />
        </main>
      </DndProvider>
      {/* модальное окно заказа */}
      {isOrderDetailsOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails isOrder={isOrder} />
        </Modal>
      )}
      {/* модальное окно ингредиента */}
      {isIngredientDetailsOpened && (
        <Modal title="Детали ингредиента" onClose={closeAllModals}>
          <IngredientDetails ingredient={ingredientInModal} />
        </Modal>
      )}
    </>
  );
};
export default App;
