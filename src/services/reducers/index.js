import {combineReducers} from 'redux';
//редьюсер массива с ингредиентами
const ingredientListReducer = () => {

}
//редьюсер для конструктора (массив выбранных ингредиентов и тип булки)
// const constructorReducer = () => {
    //добавление данных ингредиента в конструктор
// }
// //редьюсер деталей текущего просматриваемого ингредиента
// const detailsReducer = () => {

// }
// //редьюсер заказа
// const orderReducer = () => {

// }
// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientListReducer,
    // constructorReducer,
    // detailsReducer,
    // orderReducer
})