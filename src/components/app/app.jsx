import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import styles from "./app.module.css";

const App = () => {
  return (
      <div className={styles.app}>
        <>
          <AppHeader />
            <main className={styles.main}>
              <h1 className={`${styles.title} text text_type_main-large`}>
                Соберите бургер
              </h1>
              <div className={styles.wrapper}></div>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </>
      </div>
  );
};

export default React.memo(App);
