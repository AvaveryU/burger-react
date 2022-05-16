import BurgerIngredient from '../burgerIngredient/burgerIngredient'
import categoryIngredients from "./ingredientsCategory.module.css";
import ingredientPropType from '../../utils/prop-types.js';
import PropTypes from 'prop-types';

const IngredientsCategory = ({ type, title, ingredients, onOpenModal }) => {
    const category = ingredients.filter((ingredient) => ingredient.type === `${type}`);
    
    return (
      <>
        <h3 className={`${categoryIngredients.ingredient__title} text text_type_main-medium m-0`}>{title}</h3>
        <ul className={`${categoryIngredients.ingredient__list} mt-6 ml-4 mb-10`}>
          {category.map((ingredient) => (
            <BurgerIngredient ingredient={ingredient} type={type} key={ingredient._id} onOpenModal={onOpenModal} />
          ))}
        </ul>
      </>
    );
  };

  export default IngredientsCategory;
  //проверка передаваемых пропсов
  IngredientsCategory.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    onOpenModal: PropTypes.func.isRequired
  }