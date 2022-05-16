import ingredientDetailsStyles from "./ingredientDetails.module.css";
import ingredientPropType from '../../utils/prop-types.js';

const IngredientDetails = ({ingredient}) => {
  
  return (
    <div className={`${ingredientDetailsStyles.detail__data} mb-5`}>
      <div className={ingredientDetailsStyles.detail__ingredient}>
        <img className={ingredientDetailsStyles.detail__image} src={ingredient.image} />
      </div>
      <p className={`${ingredientDetailsStyles.detail__description} text text_type_main-medium mt-4 mb-8`}>
        {ingredient.title} 
      </p>
      <ul className={`${ingredientDetailsStyles.detail__macronutrients} text text_color_inactive`}>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text_type_main-default'>Калории,ккал</span>
          <span className='text_type_digits-default'>{ingredient.calories}</span>
        </li>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text text_type_main-default'>Белки, г</span>
          <span className='text text_type_digits-default'>{ingredient.proteins}</span>
        </li>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text text_type_main-default'>Жиры, г</span>
          <span className='text text_type_digits-default'>{ingredient.fat}</span>
        </li>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text text_type_main-default'>Углеводы, г</span>
          <span className='text text_type_digits-default'>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
//проверка передаваемых пропсов
IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
}