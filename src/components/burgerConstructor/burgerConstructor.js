import constructorStyles from "./burgerConstructor.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
const BurgerConstructor = () => {
  return (
    <div className={constructorStyles.constructor__box}>
      <Logo />
    </div>
  );
};

export default BurgerConstructor;
