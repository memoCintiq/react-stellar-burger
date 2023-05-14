import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types.js";
import styles from "./burger-ingredient-card.module.css";

const BurgerIngredientCard = ({ ingredient, onTab }) => {
  return (
    <div className={styles.item} onClick={() => onTab(ingredient)}>
      <Counter size="default" extraClass="m-1" className={styles.counter} />
      <img className="pt-1 pb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  );
};

BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default BurgerIngredientCard;
