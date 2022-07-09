import { combineReducers } from "redux";
import { ingredientListReducer } from "./ingredients";
import { constructorReducer } from "./constructorState";
import { detailsReducer } from "./details";
import { orderReducer } from "./order.js";
import { loginReducer } from "./login.js";

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientListReducer,
  constructorState: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  login: loginReducer
});
