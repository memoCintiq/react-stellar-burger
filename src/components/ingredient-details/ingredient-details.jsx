import { useState } from "react";
import ingredientPropType from "../../utils/prop-types";
import Loader from "../loader/loader.jsx";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredientDetails }) => {
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
          src={ingredientDetails.image_large}
          alt={ingredientDetails.name}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
        <figcaption
          className={`${styles.caption} text text_type_main-medium pt-4`}>
          {ingredientDetails.name}
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
            {ingredientDetails.calories}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Белки, г
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Жиры, г
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.fat}
          </p>
        </li>
        <li className={`${styles.item} pb-15`}>
          <p className={`${styles.text} text text_type_main-default`}>
            Углеводы, г
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredientDetails: ingredientPropType.isRequired,
};

export default IngredientDetails;
