import appHeaderStyles from "./appHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav>
        <ul className={appHeaderStyles.header__ul}>
          <li>
            <Link className={`${appHeaderStyles.header__link} mr-2 pt-4 pb-4 pl-5 pr-5`} to={{ pathname: `/` }}>
              <BurgerIcon type="primary" />
              <p className={`${appHeaderStyles.header__text} text text_type_main-default ml-2`}>
                Конструктор
              </p>
            </Link>
          </li>
          <li>
            <a className={`${appHeaderStyles.header__link} pt-4 pb-4 pl-5 pr-5`} href="#">
              <ListIcon type="secondary" />
              <p className={`${appHeaderStyles.header__text} text text_type_main-default text_color_inactive ml-2`}>
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <div className={`${appHeaderStyles.header__logo}`}>
        <Logo />
      </div>
      <Link className={`${appHeaderStyles.header__link} pt-4 pb-4 pl-5 pr-5`} to={{ pathname: `/login` }}>
        <ProfileIcon type="secondary" />
        <p className={`${appHeaderStyles.header__text} text text_type_main-default text_color_inactive ml-2`}>
          Личный кабинет
        </p>
      </Link>
    </header>
  );
};
export default AppHeader;
