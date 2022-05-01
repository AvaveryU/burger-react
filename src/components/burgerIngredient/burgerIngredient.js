import ingredientStyles from "./burgerIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ ingredient }) => {
    return (
      <li className={ingredientStyles.ingredient__li}>
        <img className={`${ingredientStyles.ingredient__image}`} src={ingredient.image} alt={ingredient.name} key={ingredient._id} />
        <div>
          <div className={`${ingredientStyles.ingredient__price} mb-1 mt-1`}>
            <p className={`${ingredientStyles.ingredient__digits} text text_type_digits-default mr-2`}>{ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${ingredientStyles.ingredient__name} text text_type_main-small m-0`}>{ingredient.name}</p>
        </div>
      </li>
    );
  };

  export default BurgerIngredient;