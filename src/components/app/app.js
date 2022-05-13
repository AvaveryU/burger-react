import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { useEffect, useState } from "react";
import URL from "../../utils/data.json";

const App = () => {
  const [ingredients, setIngredients] = useState(null);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки - заказ
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки - ингредиент
  const [ingredientInModal, setIngredientInModal] = useState({}); // карточка с ингредиентом

  useEffect(() => {
    const getIngredientsData = async () => {
      const response = await fetch(URL.baseURL);
      const data = await response.json();
      if (response.ok) {
        setIngredients(data.data);
      } else {
        return Promise.reject(
          `ошибка при запросе данных с сервера: ${response.status} (${response.statusText})`
        );
      }
    };
    getIngredientsData();
  }, []);
  // Закрытие всех модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };
  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };
  // открытие окна с ингредиентом
  const handleOpenIngredientDetails = (idIngredient) => {
    setIngredientInModal(ingredients.find((ingredient) => ingredient._id === idIngredient));
    setIsIngredientDetailsOpened(true);
  };
  // открытие окна заказа
  const handleOpenOrder = () => {
    setIsOrderDetailsOpened(true);
  };

  return (
    ingredients && (
      <>
        <AppHeader />
        <main className={appStyles.app}>
          <BurgerIngredients ingredients={ingredients} onOpenModal={handleOpenIngredientDetails} />
          <BurgerConstructor ingredients={ingredients} onOpenModal={handleOpenOrder} />
        </main>
        {/* модальное окно заказа */}
        {isOrderDetailsOpened && (
          <Modal onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
            <OrderDetails /> {/* вложенное содержимое, идет в пропс children  */}
          </Modal>
        )}
        {/* модальное окно ингредиента */}
        {isIngredientDetailsOpened && (
          <Modal
            title="Детали ингредиента"
            onOverlayClick={closeAllModals}
            onEscKeydown={handleEscKeydown}
          >
            <IngredientDetails ingredient={ingredientInModal} />
          </Modal>
        )}
      </>
    )
  );
};
export default App;
