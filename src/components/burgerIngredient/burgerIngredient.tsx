import ingredientStyles from "./burgerIngredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { TBurgerIngredientProps } from "../../utils/types";
import { useSelector } from "../../services/store";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FunctionComponent } from "react";

const BurgerIngredient: FunctionComponent<TBurgerIngredientProps> = ({ ingredient, type, onOpenModal }) => {
  const location = useLocation();
  const orderState = useSelector((state) => state.constructorState);

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

  //хук для подсчета кол-ва ингредиентов
  const count = useMemo(() => {
    return [
      orderState.data.filter((item) => item._id === ingredient._id).length, //кол-во ингредиентов
      [orderState.bun].filter((item) => item?._id === ingredient._id).length * 2, //кол-во булок
    ];
  }, [orderState, ingredient]);

  return (
    <Link to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}>
      <li
        //type={type}
        className={`${ingredientStyles.ingredient__element}`}
        key={ingredient._id}
        onClick={handleOpenModal}
        ref={drag}
        draggable
      >
        {isDrag && (
          <>
            {(count[0] > 0 && <Counter count={count[0]} size="default" />) ||
              (count[1] > 0 && <Counter count={count[1]} size="default" />)}
            <img className={`${ingredientStyles.ingredient__image}`} src={ingredient.image} alt={ingredient.name} />
            <div>
              <div className={`${ingredientStyles.ingredient__price} mb-1 mt-1`}>
                <p className={`${ingredientStyles.ingredient__digits} text text_type_digits-default mr-2`}>
                  {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p className={`${ingredientStyles.ingredient__name} text text_type_main-small m-0`}>{ingredient.name}</p>
            </div>
          </>
        )}
      </li>
    </Link>
  );
};

export default BurgerIngredient;
