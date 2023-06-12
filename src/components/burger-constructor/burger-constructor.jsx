import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngredientsConstructor,
  addIngredientsConstructorBun,
  clearIngredientsConstructor,
  clearIngredientsConstructorBun,
  closeOrderDetailsModal,
  openOrderDetailsModal,
  postOrder,
  moveIngredient,
} from "../../services/actions/actions";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import TotalPrice from "../total-price/total-price";
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const { isOrderPopupOpened } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  const onDropHandler = useCallback(
    (item) => {
      const { type } = item;
      if (type === "bun") {
        dispatch(addIngredientsConstructorBun(item));
      } else {
        dispatch(addIngredientsConstructor(item, uuidv4()));
      }
    },
    [dispatch]
  );

  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop: onDropHandler,
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  });

  const moveIngredientItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient(dragIndex, hoverIndex));
    },
    [dispatch]
  );

  const nonBunsIngredients = useMemo(
    () => ingredients.filter((m) => m.type !== "bun"),
    [ingredients]
  );

  const totalPrice = useMemo(() => {
    const ingredientsPrice = nonBunsIngredients.reduce(
      (acc, item) => acc + item.price, 0);
      const bunPrice = bun ? bun.price * 2 : 0;
      return ingredientsPrice + bunPrice;
    },
    [bun, nonBunsIngredients]
  );

  const orderedIngredients = useMemo(
    () => ingredients.map((m) => m._id),
    [ingredients]
  );

  const handleOpenModal = useCallback(() => {
    dispatch(openOrderDetailsModal());
    const allIngredients = [...orderedIngredients, bun._id];
    dispatch(postOrder(allIngredients));
    },
    [dispatch, orderedIngredients, bun]
  );

  // обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    dispatch(closeOrderDetailsModal());
    dispatch(clearIngredientsConstructor());
    dispatch(clearIngredientsConstructorBun());
    },
    [dispatch]
  );

  return (
    <div>
      <div className={`${styles.ingredient} pl-4 pb-5`} ref={drop}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            ingredient={bun}
          />
        )}
        <ul className={`${styles.list}`}>
          {nonBunsIngredients.map((item) => (
            <li key={item.key} className={`${styles.item} pb-4`}>
              <DragIcon type="primary" />
              <BurgerIngredient
                ingredient={item}
                moveIngredientItem={moveIngredientItem}
              />
            </li>
          ))}
          {!bun && (
            <p className={`text text_type_main-medium ${styles.text}`}>
              Выберите булку и начинку
            </p>
          )}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingredient={bun}
          />
        )}
      </div>
      <div className={`${styles.order} pt-5 pr-4`}>
        <TotalPrice totalPrice={totalPrice} />
        <div className="pl-5">
          <Button
          aria-label=""
          htmlType="button"
          type="primary"
          size="large"
          disabled={!bun}
          onClick={handleOpenModal}>
          Оформить заказ
        </Button>
        </div>
      </div>
      {isOrderPopupOpened && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default React.memo(BurgerConstructor);
