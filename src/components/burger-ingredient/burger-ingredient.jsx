import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { DELETE_INGREDIENTS_CONSTRUCTOR } from "../../services/actions/actions";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ ingredient, moveIngredientItem }) => {
  const { ingredients } = useSelector((state) => state.burgerConstructor);

  const id = ingredient.key;
  const index = ingredients.indexOf(ingredient);

  const dispatch = useDispatch();

  const onDelete = () => {
    return dispatch({
      type: DELETE_INGREDIENTS_CONSTRUCTOR,
      key: ingredient.key,
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredientItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIngredientItem(dragIndex, hoverIndex);
    },
  });

  const ref = useRef(null);
  const dragDropRef = drag(drop(ref));

  return (
    <div
      className={`${styles.box} pl-2`}
      data-handler-id={handlerId}
      ref={dragDropRef}
      style={{ opacity }}>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => onDelete()}
      />
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default React.memo(BurgerIngredient);
