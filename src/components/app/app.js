import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

const App = () => {
    return(
        <div className={appStyles.app}>
        <AppHeader/>
        <BurgerIngredients/>
        <BurgerConstructor/>
        </div>
    )
}
export default App; 