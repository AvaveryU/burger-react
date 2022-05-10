import constructorStyles from "./burgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIcon from "../../images/CurrencyIcon.svg";
import ingredientPropType from '../../utils/prop-types.js';
import PropTypes from 'prop-types';
const BurgerConstructor = ({ ingredients }) => {
  const buns = ingredients.filter((ingredient) => ingredient.type === `bun`);
  const ingredientsBetweenBuns = ingredients.filter((ingredient) => ingredient.type !== `bun`);
  
  return (
    <div className={`${constructorStyles.constructor__box} mt-25 ml-4`}>
      <div className="ml-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${buns[0].name} (верх)`}
          thumbnail={buns[0].image_mobile}
          price={buns[0].price}
        />
      </div>
      <ul className={`${constructorStyles.constructor__list}`}>
        {ingredientsBetweenBuns.map((item, index) => (
          <li className={`${constructorStyles.constructor__element}`} key={index}>
            <div className={`${constructorStyles.constructor__dragIcon} mr-2`}>
              <DragIcon />
            </div>
            <ConstructorElement
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </li>
        ))}
      </ul>
      <div className="ml-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${buns[0].name} (низ)`}
          thumbnail={buns[0].image_mobile}
          price={buns[0].price}
        />
      </div>
      <div className={`${constructorStyles.constructor__button} mr-10 mt-10`}>
        <p className="text text_type_digits-medium mr-2">{610}</p>
        <img
          className={`${constructorStyles.constructor__icon} mr-10`}
          src={CurrencyIcon}
          alt="иконка"
        ></img>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
//проверка передаваемых пропсов
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}
ConstructorElement.propTypes = {
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}