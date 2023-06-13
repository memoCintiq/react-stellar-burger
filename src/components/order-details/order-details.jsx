import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useSelector } from "react-redux";
import { orderDetailsPropType } from "../../utils/prop-types";
import Loader from "../loader/loader";
import styles from "./order-details.module.css";

const OrderDetails = () => {
  const { orderRequest, orderFailed, orderCurrent } = useSelector(
    (state) => state.orderDetails
  );

  if (orderFailed || orderRequest) {
    return <Loader />;
  } else {
    return (
      <div>
        <ul className={`${styles.list} m-4 pb-15`}>
          <li className={`${styles.item} pb-15`}>
            <p className={`${styles.number} text text_type_digits-large pb-4`}>
              {orderCurrent.order.number}
            </p>
            <p className="text text_type_main-medium pt-4">идентификатор заказа</p>
          </li>
          <li className={`${styles.item} pb-15 pt-15`}>
            <div className={styles.check}>
              <div className={styles.icon}>
                <CheckMarkIcon type="primary" />
              </div>
            </div>
          </li>
          <li className={`${styles.item} pb-15 pt-15`}>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={`${styles.text} text text_type_main-default`}>
              Дождитесь готовности на орбитальной станции
            </p>
          </li>
        </ul>
      </div>
    );
  }
};

OrderDetails.propTypes = {
  order: orderDetailsPropType,
};

export default React.memo(OrderDetails);
