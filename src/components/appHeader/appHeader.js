import appHeaderStyles from "./appHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.header__nav}>
        <ul className={appHeaderStyles.header__ul}>
          <li className="mr-2">
            <a className={`${appHeaderStyles.header__link} p-5`} href='#'>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
          </li>
          <li>
            <a className={`${appHeaderStyles.header__link} p-5`} href='#'>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </a>
          </li>
        </ul>
      </nav>
      <Logo />
      <a className={`${appHeaderStyles.header__link} p-5`} href='#'>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
      </a>
    </header>
  );
};
export default AppHeader;
