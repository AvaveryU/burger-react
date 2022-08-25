import { combineReducers } from "redux";
import { ingredientListReducer } from "./ingredients";
import { constructorReducer } from "./constructorState";
import { detailsReducer } from "./details";
import { orderReducer } from "./order";
import { userReducer } from "./user.js";
import { wsReducer } from "./wsReducer.js";
import { wsAuthReducer } from "./wsReducerUser.js";

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientListReducer,
  constructorState: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
  wsData: wsReducer,
  wsAuth: wsAuthReducer,
});
