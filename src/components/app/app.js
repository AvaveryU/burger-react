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
import { getIngredientsData } from "../../services/action/ingredients";
import { CLOSE_MODAL, OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL } from "../../services/action/details.js";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { getUserInfo } from "../../services/action/user";
import { getCookie } from "../../utils/utils";
import OrderId from "../orderId/orderId";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.ingredients);
  // Булевые стейты для модальных окон
  const { isOrderDetailsOpened, isIngredientDetailsOpened, isOrderUsersOpened } = useSelector((state) => state.details);
  const { isLogin, user } = useSelector((state) => state.user); //данные о пользователе
  const background = location.state?.background;
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = getCookie("token");

  useEffect(() => {
    //диспатчим данные об ингредиентах
    dispatch(getIngredientsData());
    //диспатчим данные о текущем пользователе
    if (!isLogin && refreshToken && accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch, refreshToken, accessToken, isLogin]);
  // закрытие всех модалок
  const closeAllModals = useCallback(() => {
    if (isIngredientDetailsOpened || isOrderDetailsOpened) {
      history.replace("/");
      dispatch({ type: CLOSE_MODAL });
    } else {
      history.goBack();
    }
  }, [dispatch, isIngredientDetailsOpened, isOrderUsersOpened, isOrderDetailsOpened, history]);

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
        <ProtectedRoute anonymous={true} user={user} path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderId />
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
      {background && (
        <Route path="/ingredients/:id">
          <Modal title="Детали ингредиента" onClose={closeAllModals}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {/* окно заказа с ингредиентами */}
      {background && (
        <Route path="/feed/:id">
          <Modal onClose={closeAllModals}>
            <OrderId />
          </Modal>
        </Route>
      )}
      {/* окно заказа с ингредиентами */}
      {background && (
        <ProtectedRoute path="/profile/orders/:id">
          <Modal onClose={closeAllModals}>
            <OrderId />
          </Modal>
        </ProtectedRoute>
      )}
    </>
  );
};
export default App;
