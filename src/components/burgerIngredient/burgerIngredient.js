import ingredientStyles from "./burgerIngredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from '../../utils/prop-types.js';
import PropTypes from 'prop-types';

const BurgerIngredient = ({ ingredient, type }) => {
    return (
      <li type={type} className={ingredientStyles.ingredient__element}>
        <Counter count={0} size="default"/>
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
  //проверка передаваемых пропсов
  BurgerIngredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    type: PropTypes.string.isRequired
  }