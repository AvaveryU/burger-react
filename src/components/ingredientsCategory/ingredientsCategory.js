import BurgerIngredient from "../burgerIngredient/burgerIngredient";
import categoryIngredients from "./ingredientsCategory.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const IngredientsCategory = ({ type, title, onOpenModal }) => {
  const { ingredients } = useSelector((state) => state.ingredients);

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
  onOpenModal: PropTypes.func.isRequired,
};
