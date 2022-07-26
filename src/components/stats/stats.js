//на странице /feed статистика заказов
import styles from "./stats.module.css";
const Stats = () => {
  return (
    <div className={`${styles.stats_box} ml-15 mt-25`}>
      <div className={`${styles.stats_boards}`}>
        <span className={`text text_type_main-medium`}>Готовы:</span>
        <span className={`text text_type_main-medium`}>В работе:</span>
        <ul className={`${styles.stats_done}`}>
          <li className={`${styles.stats_item} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.stats_item} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.stats_item} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.stats_item} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.stats_item} text text_type_digits-default mb-2`}>034533</li>
        </ul>
        <ul className={`${styles.stats_inwork}`}>
          <li className={`text text_type_digits-default mb-2`}>034538</li>
          <li className={`text text_type_digits-default mb-2`}>034538</li>
          <li className={`text text_type_digits-default mb-2`}>034538</li>
        </ul>
      </div>
      <div className={`${styles.stats_completed}`}>
        <span className={`text text_type_main-medium`}>Выполнено за все время:</span>
        <span className={`${styles.stats_digits} text text_type_digits-large`}>28 752</span>
      </div>
      <div className={`${styles.stats_completed}`}>
        <span className={`text text_type_main-medium`}>Выполнено за сегодня:</span>
        <span className={`${styles.stats_digits} text text_type_digits-large`}>138</span>
      </div>
    </div>
  );
};
export default Stats;
