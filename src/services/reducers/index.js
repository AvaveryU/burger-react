import { combineReducers } from 'redux';
import { ingredientListReducer } from './ingredientList';
import { constructorReducer } from './constructor';
import { detailsReducer } from './details';
import { orderReducer } from './order.js';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientListReducer,
    constructor: constructorReducer,
    details: detailsReducer,
    order: orderReducer
})
