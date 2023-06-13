import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../loader/loader.jsx";
import styles from "./ingredient-details.module.css";

const IngredientDetails = () => {
  const popupIngredient = useSelector(
    (state) => state.ingredientDetails.popupIngredient
  );

  const [imageIsLoading, setImageIsLoading] = useState(false);

  const handleImageLoad = () => {
    setImageIsLoading(true);
  };

  return (
    <div className={styles.box}>
      {!imageIsLoading && <Loader />}
      <figure
        className={`${styles.figure} pb-4`}
        style={{ opacity: imageIsLoading ? 1 : 0 }}>
        <img
          src={popupIngredient.image_large}
          alt={popupIngredient.name}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
        <figcaption
          className={`${styles.caption} text text_type_main-medium pt-4`}>
          {popupIngredient.name}
        </figcaption>
      </figure>
      <ul
        className={`${styles.list} pt-4`}
        style={{ opacity: imageIsLoading ? 1 : 0 }}
      >
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Калории, ккал
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {popupIngredient.calories}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Белки, г
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {popupIngredient.proteins}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Жиры, г
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {popupIngredient.fat}
          </p>
        </li>
        <li className={`${styles.item} pb-15`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Углеводы, г
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {popupIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(IngredientDetails);
