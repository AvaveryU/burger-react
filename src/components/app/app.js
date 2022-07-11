import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage, RegisterPage, ForgotPassword, Profile, ResetPassword } from "../../pages";

import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { getIngredientsData } from "../../services/action/ingredients.js";
import { CLOSE_MODAL, OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL } from "../../services/action/details.js";
import { ProtectedRoute } from '../protectedRoute/protectedRoute';

const App = () => {
  const history = useHistory();

  const { ingredients, isLoading, error } = useSelector((state) => state.ingredients);
  // Булевые стейты для модального окна заказа, модального окна ингредиента и карточки с ингредиентом
  const { isOrderDetailsOpened, isIngredientDetailsOpened, ingredientInModal } = useSelector((state) => state.details);
  // данные о заказе
  const isOrder = useSelector((state) => state.order);
//данные о пользователе зарегистрированном 
  const isUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // хук для получения данных с сервера
  useEffect(() => {
    //отправляем экшен creator и получаем ингредиенты
    dispatch(getIngredientsData());
  }, [dispatch]);

  // закрытие всех модалок
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
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <main className={appStyles.app}>
                <BurgerIngredients onOpenModal={handleOpenIngredientDetails} />
                <BurgerConstructor onOpenModal={handleOpenOrder} />
              </main>
            </DndProvider>
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <ProtectedRoute user={isUser} path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
        </Switch>
      </Router>

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
