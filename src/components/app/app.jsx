import { useEffect, useState } from "react";
import getData from "../../api/api";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import Loader from "../loader/loader.jsx";
import styles from "./app.module.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    setIsLoading(true);
    getData()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className={styles.app}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <AppHeader />
        <main className={styles.main}>
          <h1 className={`${styles.title} text text_type_main-large`}>
            Соберите бургер
          </h1>
          <div className={styles.wrapper}></div>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
        </>
      )}
    </div>
  );
};

export default App;
