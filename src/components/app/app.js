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

  // проверка ответа от сервера
  function checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Ошибка при взаимодействии с сервером!");
  }
  // хук для получения данных с сервера
  useEffect(() => {
    const urlIngredients = "ingredients";
    const getIngredientsData = async () => {
      const response = await fetch(INFO.baseURL + urlIngredients, {
        method: "GET",
      });
      const data = await checkResponse(response);
      setIngredients(data.data);
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
      .then(checkResponse)
      .then((isOrderNumber) => {
        setOrderDetails(isOrderNumber);
      })
      .catch((error) => console.log(error));
  };
  // Закрытие всех модалок
  const closeAllModals = useCallback(() => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
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
            <Modal onClose={closeAllModals}>
              <OrderDetails isOrderNumber={isOrderNumber} />
            </Modal>
          )}
          {/* модальное окно ингредиента */}
          {isIngredientDetailsOpened && (
            <Modal title="Детали ингредиента" onClose={closeAllModals}>
              <IngredientDetails ingredient={ingredientInModal} />
            </Modal>
          )}
        </TotalPriceContext.Provider>
      </BurgerIngredientsContext.Provider>
    </>
  );
};
export default App;
