import appHeaderStyles from "./appHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, RootState } from "../../services/store";
import { FunctionComponent } from "react";

const AppHeader: FunctionComponent = () => {
  //если пользователь авторизован, будет отображено имя вместо "личный кабинет"
  const userName = useSelector((state: RootState) => state.user.user.name);
  const pageHome = useRouteMatch({ path: "/", exact: true });
  const pageProfile = useRouteMatch("/profile");
  const pageLogin = useRouteMatch("/login");
  const pageFeed = useRouteMatch("/feed");

  return (
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav>
        <ul className={appHeaderStyles.header__ul}>
          <li>
            <Link
              className={`${appHeaderStyles.header__link} mr-2 pt-4 pb-4 pl-5 pr-5`}
              to={{ pathname: `/` }}
              //exact="true"
            >
              <BurgerIcon type={pageHome ? "primary" : "secondary"} />
              <p
                className={`${pageHome ? `text_color_active` : `text_color_inactive`} text text_type_main-default ml-2`}
              >
                Конструктор
              </p>
            </Link>
          </li>
          <li>
            <Link
              className={`${appHeaderStyles.header__link} pt-4 pb-4 pl-5 pr-5`}
              to={{ pathname: `/feed` }}
              //exact="true"
            >
              <ListIcon type={pageFeed ? "primary" : "secondary"} />
              <p
                className={`${pageFeed ? `text_color_active` : `text_color_inactive`} text text_type_main-default ml-2`}
              >
                Лента заказов
              </p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`${appHeaderStyles.header__logo}`}>
        <Logo />
      </div>
      <Link className={`${appHeaderStyles.header__link} pt-4 pb-4 pl-5 pr-5`} to={{ pathname: `/profile` }}>
        <ProfileIcon type={pageProfile ? "primary" : "secondary"} />
        <p
          className={`${
            pageProfile || pageLogin ? `text_color_active` : `text_color_inactive`
          } text text_type_main-default ml-2`}
        >
          {userName || "Личный кабинет"}
        </p>
      </Link>
    </header>
  );
};
export default AppHeader;
