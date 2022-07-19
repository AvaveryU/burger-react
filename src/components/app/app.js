import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from "react-router-dom";
import { LoginPage, RegisterPage, ForgotPassword, Profile, ResetPassword } from "../../pages";
import { useLocation, useHistory } from "react-router-dom";
import appStyles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { getIngredientsData } from "../../services/action/ingredients.js";
import { CLOSE_MODAL, OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL } from "../../services/action/details.js";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { getUserInfo } from "../../services/action/user";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.ingredients);
  // Булевые стейты для модального окна заказа, модального окна ингредиента и карточки с ингредиентом
  const { isOrderDetailsOpened, isIngredientDetailsOpened } = useSelector((state) => state.details);
  const isOrder = useSelector((state) => state.order); // данные о заказе
  const isUser = useSelector((state) => state.user.user); //данные о пользователе
  const { isAuthChecked } = useSelector((state) => state.user); //флаг авторизированного пользователя
  const background = location.state?.background;

  useEffect(() => {
    //диспатчим данные об ингредиентах
    dispatch(getIngredientsData());
    //диспатчим данные о текущем пользователе
    if (isAuthChecked) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  // закрытие всех модалок
  const closeAllModals = useCallback(() => {
      history.goBack(); //вернуться на одну страницу назад в истории сеансов
    dispatch({ type: CLOSE_MODAL });
  }, [dispatch]);

  // открытие окна с ингредиентом
  const handleOpenIngredientDetails = () => {
    dispatch({
      type: OPEN_INGREDIENT_MODAL,
    });
  };

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
      <Switch location={background || location}>
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
        <ProtectedRoute path="/reset-password" exact={true}>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute user={isUser} path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <IngredientDetails title="Детали ингредиента" />
        </Route>
      </Switch>
      {/* модальное окно заказа */}
      {isOrderDetailsOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails isOrder={isOrder} />
        </Modal>
      )}
      {/* модальное окно ингредиента */}
      {background && isIngredientDetailsOpened && (
        <Route path="/ingredients/:id">
          <Modal title="Детали ингредиента" onClose={closeAllModals}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
};
export default App;
