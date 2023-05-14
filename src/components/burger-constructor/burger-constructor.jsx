import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { useMemo } from "react";
import useModal from "../../utils/hooks/useModal";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ ingredients }) => {
  const { isModalOpened, openModal, closeModal } = useModal();

  const bun = useMemo(
    () => ingredients.filter((m) => m.type === "bun")[0],
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients.filter((m) => m.type === "sauce")[0],
    [ingredients]
  );
  const filling = useMemo(
    () => ingredients.filter((m) => m.type === "main")[0],
    [ingredients]
  );

  const totalPrice = useMemo(
    () =>
      ingredients.reduce(
        (acc, current) =>
          current.type === "bun"
            ? acc + current.price * 2
            : acc + current.price, 0
      ),
    [ingredients]
  );

  const handleOpenModal = () => {
    openModal();
  };
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div>
      <div className={`${styles.ingredient} pl-4 pb-5`}>
        <ConstructorElement
          className={styles.buns}
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          ingredient={bun}
        />
        <ul className={`${styles.list} pt-5`}>
          {ingredients.map(
            (item) => item.type !== "bun" && (
                <li key={item._id} className={`${styles.item} pb-4`}>
                  <DragIcon type="primary" />
                  <div className={`${styles.box} pl-2`}>
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image_mobile}
                    />
                  </div>
                </li>
              )
          )}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          ingredient={bun}
        />
      </div>
      <div className={`${styles.order} pt-5 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          aria-label=""
          htmlType="button"
          type="primary"
          size="large"
          disabled={!bun || !sauce || !filling}
          onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpened && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
