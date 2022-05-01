import BurgerIngredient from '../burgerIngredient/burgerIngredient'
import categoryIngredients from "./ingredientsCategory.module.css";

const IngredientsCategory = ({ type, title, ingredients }) => {
    const category = ingredients.filter((ingredient) => ingredient.type === `${type}`);
    return (
      <>
        <h3 className={`${categoryIngredients.ingredient__title} text text_type_main-medium m-0`}>{title}</h3>
        <ul className={`${categoryIngredients.ingredient__ul} mt-6 ml-4 mb-10`}>
          {category.map((ingredient) => (
            <BurgerIngredient ingredient={ingredient} type={type} key={ingredient._id} />
          ))}
        </ul>
      </>
    );
  };

  export default IngredientsCategory;