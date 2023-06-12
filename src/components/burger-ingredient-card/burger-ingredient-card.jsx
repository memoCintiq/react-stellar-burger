import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { ingredientPropType } from "../../utils/prop-types.js";
import styles from "./burger-ingredient-card.module.css";

const BurgerIngredientCard = ({ ingredient, onTab }) => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  const pickedIngredientsCounter = useMemo(() => {
    const ingredientItems = ingredients.filter(
      (item) => item._id === ingredient._id
    );
    return ingredientItems.length;
  }, [ingredients, ingredient._id]);

  const pickedOnlyBunsCounter = useMemo(() => {
    if (bun === null) {
      return 0;
    } else if (bun !== null && ingredient._id === bun._id) {
      return 2;
    }
  }, [bun, ingredient._id]);

  return (
    <div
      className={styles.item}
      style={{ opacity }}
      ref={drag}
      onClick={() => onTab(ingredient)}
    >
      {ingredient.type !== "bun" ? (
        <Counter count={pickedIngredientsCounter} className={styles.counter} />
      ) : (
        <Counter count={pickedOnlyBunsCounter} className={styles.counter} />
      )}
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

export default React.memo(BurgerIngredientCard);
