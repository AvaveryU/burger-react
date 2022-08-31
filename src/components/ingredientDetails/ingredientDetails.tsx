import ingredientDetailsStyles from "./ingredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FunctionComponent } from "react";
import { RootState } from "../../utils/types";

interface ITitleProps {
  title?: string;
}
const IngredientDetails: FunctionComponent<ITitleProps> = ({ title }) => {
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { id } = useParams<{ id: string }>();
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <div className={`${ingredientDetailsStyles.detail__data} mb-5`}>
      {ingredient ? (
        <>
          <h2 className={title ? `text text_type_main-large mt-30` : `text text_type_main-large`}>{title}</h2>
          <div className={ingredientDetailsStyles.detail__ingredient}>
            <img className={ingredientDetailsStyles.detail__image} src={ingredient.image} alt="ингредиент" />
          </div>
          <p className={`${ingredientDetailsStyles.detail__description} text text_type_main-medium mt-4 mb-8`}>
            {ingredient.name}
          </p>
          <ul className={`${ingredientDetailsStyles.detail__macronutrients} text text_color_inactive`}>
            <li className={ingredientDetailsStyles.detail__macronutrient}>
              <span className="text_type_main-default">Калории,ккал</span>
              <span className="text_type_digits-default">{ingredient.calories}</span>
            </li>
            <li className={ingredientDetailsStyles.detail__macronutrient}>
              <span className="text text_type_main-default">Белки, г</span>
              <span className="text text_type_digits-default">{ingredient.proteins}</span>
            </li>
            <li className={ingredientDetailsStyles.detail__macronutrient}>
              <span className="text text_type_main-default">Жиры, г</span>
              <span className="text text_type_digits-default">{ingredient.fat}</span>
            </li>
            <li className={ingredientDetailsStyles.detail__macronutrient}>
              <span className="text text_type_main-default">Углеводы, г</span>
              <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
            </li>
          </ul>
        </>
      ) : (
        <span className={`text text_type_main-large mt-20`}>Такой ингредиент отсутствует :( </span>
      )}
    </div>
  );
};

export default IngredientDetails;
