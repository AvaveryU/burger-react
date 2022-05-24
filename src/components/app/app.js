import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { useEffect, useState, useCallback } from "react";
import INFO from "../../utils/data.json";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { TotalPriceContext } from "../../context/priceContext";

const App = () => {
  const [ingredients, setIngredients] = useState(null);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки - заказ
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки - ингредиент
  const [ingredientInModal, setIngredientInModal] = useState({}); // карточка с ингредиентом
  const [isOrderNumber, setOrderDetails] = useState({
    name: "",
    order: {
      number: "",
    },
    success: false,
  }); // состояние начальное для заказа
  const [totalPrice, setTotalPrice] = useState(null); //стейт для стоимости заказа

  useEffect(() => {
    const urlIngredients = "ingredients";
    const getIngredientsData = async () => {
      const response = await fetch(INFO.baseURL + urlIngredients, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setIngredients(data.data);
      } else {
        throw new Error("Ошибка при запросе данных с сервера!");
      }
    };
    getIngredientsData().catch((error) => console.log(error));
  }, []);
  // функция для отправки данных на сервер
  const postOrderDetails = () => {
    const urlOrders = "orders";
    fetch(INFO.baseURL + urlOrders, {
      method: "POST",
      headers: INFO.headers,
      body: JSON.stringify({
        ingredients: ["60d3b41abdacab0026a733c6"],
      }),
    })
      .then((res) => res.json())
      .then((isOrderNumber) => {
        setOrderDetails(isOrderNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Закрытие всех модалок
  const closeAllModals = useCallback(() => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  }, []);
  // Обработка нажатия Esc
  const handleEscKeydown = useCallback((event) => {
    event.key === "Escape" && closeAllModals();
  }, []);
  // открытие окна с ингредиентом
  const handleOpenIngredientDetails = useCallback(
    (idIngredient) => {
      setIngredientInModal(ingredients.find((ingredient) => ingredient._id === idIngredient));
      setIsIngredientDetailsOpened(true);
    },
    [ingredients]
  );
  // открытие окна заказа
  const handleOpenOrder = useCallback(() => {
    postOrderDetails(isOrderNumber);
    setIsOrderDetailsOpened(true);
  }, []);

  if (!ingredients) {
    return null;
  }
  return (
    <>
      <BurgerIngredientsContext.Provider value={ingredients}>
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
          <AppHeader />
          <main className={appStyles.app}>
            <BurgerIngredients onOpenModal={handleOpenIngredientDetails} />
            <BurgerConstructor onOpenModal={handleOpenOrder} />
          </main>
          {/* модальное окно заказа */}
          {isOrderDetailsOpened && (
            <Modal onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
              <OrderDetails isOrderNumber={isOrderNumber} /> {/* вложенное содержимое, идет в пропс children  */}
            </Modal>
          )}
          {/* модальное окно ингредиента */}
          {isIngredientDetailsOpened && (
            <Modal title="Детали ингредиента" onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
              <IngredientDetails ingredient={ingredientInModal} />
            </Modal>
          )}
        </TotalPriceContext.Provider>
      </BurgerIngredientsContext.Provider>
    </>
  );
};
export default App;
