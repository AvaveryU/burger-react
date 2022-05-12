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
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false); // Булевый стейт для одной конкретной модалки

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
    // тут же закрываем и другие модалки
    setIsIngredientDetailsOpened(false);
  };
  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };
  return (
    ingredients && (
      <>
        <AppHeader />
        <main className={appStyles.app}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
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
            {/* <IngredientDetails ingredients={ingredients} /> */}
            <IngredientDetails />
          </Modal>
        )}
      </>
    )
  );
};
export default App;
