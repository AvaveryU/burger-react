import ingredientStyles from "./burgerIngredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types.js";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useMemo } from "react";
const BurgerIngredient = ({ ingredient, type, onOpenModal }) => {
  const handleOpenModal = () => {
    onOpenModal(ingredient._id);
  };
  //хук для перетаскиваемого элемента в конструктор
  const [isDrag, drag] = useDrag({
    type: "ingredient",
    item: ingredient,
    //функция, которая получает объект monitor из react-dnd. Он содержит состояние и метаданные действия перетаскивания
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const orderState = useSelector((state) => state.constructorState);
  //хук для подсчета кол-ва ингредиентов
  const count = useMemo(() => {
    return orderState.data.filter((item) => item._id === ingredient._id).length;
  }, [orderState, ingredient]);

  return (
    <li type={type} className={ingredientStyles.ingredient__element} key={ingredient._id} onClick={handleOpenModal} ref={drag} draggable>
      {isDrag && (
        <>
          {count > 0 && <Counter count={count} size="default" />}
          <img className={`${ingredientStyles.ingredient__image}`} src={ingredient.image} alt={ingredient.name} />
          <div>
            <div className={`${ingredientStyles.ingredient__price} mb-1 mt-1`}>
              <p className={`${ingredientStyles.ingredient__digits} text text_type_digits-default mr-2`}>{ingredient.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={`${ingredientStyles.ingredient__name} text text_type_main-small m-0`}>{ingredient.name}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default BurgerIngredient;
//проверка передаваемых пропсов
BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  type: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
