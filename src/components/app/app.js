import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from "react-router-dom";
import { LoginPage, RegisterPage, ForgotPassword, ProfilePage, ResetPassword, FeedPage } from "../../pages";
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
import { getCookie } from "../../utils/utils";
import OrderId from "../orderId/orderId";
import OrderList from "../orderList/orderList";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.ingredients);
  // Булевые стейты для модального окна заказа, модального окна ингредиента и карточки с ингредиентом
  const { isOrderDetailsOpened, isIngredientDetailsOpened } = useSelector((state) => state.details);
  const isUser = useSelector((state) => state.user.user); //данные о пользователе
  const background = location.state?.background;

  useEffect(() => {
    //диспатчим данные об ингредиентах
    dispatch(getIngredientsData());
    //диспатчим данные о текущем пользователе
    if (getCookie("token") || localStorage.getItem("refreshToken")) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  // закрытие всех модалок
  const closeAllModals = useCallback(() => {
    if (isIngredientDetailsOpened) {
      history.goBack(); //вернуться на одну страницу назад в истории сеансов
      dispatch({ type: CLOSE_MODAL });
    } else {
      dispatch({ type: CLOSE_MODAL });
    }
  }, [dispatch, isIngredientDetailsOpened, history]);

  // открытие окна с ингредиентом
  const handleOpenIngredientDetails = () => {
    dispatch({
      type: OPEN_INGREDIENT_MODAL,
    });
  };

  // открытие окна заказа
  const handleOpenOrder = () => {
    dispatch({ type: OPEN_ORDER_MODAL });
  };

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
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <OrderId />
        </Route>
        <ProtectedRoute path="/reset-password" exact={true}>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute anonymous={true} user={isUser} path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderList />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <IngredientDetails title="Детали ингредиента" />
        </Route>
      </Switch>
      {/* модальное окно заказа */}
      {isOrderDetailsOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails />
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
