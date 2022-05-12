import ingredientDetailsStyles from "./ingredientDetails.module.css";
import DoneInPopup from "../../images/DoneInPopup.svg";

const IngredientDetails = () => {
  return (
    <div className={`${ingredientDetailsStyles.detail__data} mb-5`}>
      <div className={ingredientDetailsStyles.detail__ingredient}>
        <img className={ingredientDetailsStyles.detail__image} src={DoneInPopup} />
      </div>
      <p
        className={`${ingredientDetailsStyles.detail__description} text text_type_main-medium mt-4 mb-8`}
      >
        Биокотлета из марсианской Магнолии
      </p>
      <ul
        className={`${ingredientDetailsStyles.detail__macronutrients} text text_color_inactive`}
      >
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text_type_main-default'>Калории,ккал</span>
          <span className='text_type_digits-default'>244,4</span>
        </li>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text text_type_main-default'>Белки, г</span>
          <span className='text text_type_digits-default'>12,2</span>
        </li>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text text_type_main-default'>Жиры, г</span>
          <span className='text text_type_digits-default'>17,2</span>
        </li>
        <li className={ingredientDetailsStyles.detail__macronutrient}>
          <span className='text text_type_main-default'>Углеводы, г</span>
          <span className='text text_type_digits-default'>10,2</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
