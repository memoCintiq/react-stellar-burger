import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import {
  closeIngredientDetailsModal,
  deletePopupIngredient,
  getData,
  openIngredientDetailsModal,
  setPopupIngredient,
} from "../../services/actions/actions";
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Loader from "../loader/loader";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("buns");

  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useSelector((state) => state.burgerIngredients);

  const { isPopupIngredientOpened } = useSelector((state) => state.ingredientDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const tab = {
    buns: {
      name: "Булки",
      type: "bun",
    },
    sauces: {
      name: "Соусы",
      type: "sauce",
    },
    fillings: {
      name: "Начинки",
      type: "main",
    },
  };

  // Tabs and scrolling

  const tabRefs = {
    [tab.buns.type]: useRef(null),
    [tab.sauces.type]: useRef(null),
    [tab.fillings.type]: useRef(null),
  };

  const selectTab = (selectedTab) => {
    if (currentTab === selectedTab) {
      return;
    }
    setCurrentTab(selectedTab);
    const selectedTabItem = tabRefs[selectedTab].current;
    if (selectedTabItem) {
      selectedTabItem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredBunIngredients = useMemo(() =>
    burgerIngredients.filter((ingredient) => ingredient.type === tab.buns.type),
    [burgerIngredients, tab.buns.type]
  );

  const filteredSauceIngredients = useMemo(() =>
    burgerIngredients.filter((ingredient) => ingredient.type === tab.sauces.type),
    [burgerIngredients, tab.sauces.type]
  );

  const filteredFillingIngredients = useMemo(() =>
    burgerIngredients.filter((ingredient) => ingredient.type === tab.fillings.type),
    [burgerIngredients, tab.fillings.type]
  );

  const rootRef = useRef(null);

  // check if sections are on screen
  const [inViewBunRef, bunIsInView] = useInView({
    threshold: 0.15,
    root: rootRef.current,
  });
  const [inViewSauceRef, sauceIsInView] = useInView({
    threshold: 0.2,
    root: rootRef.current,
  });
  const [inViewFillingRef, fillingIsInView] = useInView({
    threshold: 0.5,
    root: rootRef.current,
  });

  const handleOpenModalIngredient = (item) => {
    dispatch(openIngredientDetailsModal());
    dispatch(setPopupIngredient(item));
  };
  const handleCloseModalIngredient = () => {
    dispatch(closeIngredientDetailsModal());
    dispatch(deletePopupIngredient());
  };

  if (burgerIngredientsRequest || burgerIngredientsFailed) {
    return <Loader />;
  } else {
    return (
      <>
        <div className={`${styles.wrapper}`}>

          <div className={`${styles.tabs} pt-5 pb-5`}>
            <div ref={tabRefs[tab.buns.type]}>
              <Tab
                className={
                  currentTab === tab.buns.type ? `${styles.disabled}` : ""
                }
                active={bunIsInView}
                onClick={() => selectTab(tab.buns.type)}
              >
                {tab.buns.name}
              </Tab>
            </div>
            <div ref={tabRefs[tab.sauces.type]}>
              <Tab
                className={
                  currentTab === tab.sauces.type ? `${styles.disabled}` : ""
                }
                active={sauceIsInView && !bunIsInView && !fillingIsInView}
                onClick={() => selectTab(tab.sauces.type)}
              >
                {tab.sauces.name}
              </Tab>
            </div>
            <div ref={tabRefs[tab.fillings.type]}>
              <Tab
                className={
                  currentTab === tab.fillings.type ? `${styles.disabled}` : ""
                }
                active={fillingIsInView || (!bunIsInView && !sauceIsInView)}
                onClick={() => selectTab(tab.fillings.type)}
              >
                {tab.fillings.name}
              </Tab>
            </div>
          </div>
          <div className={`${styles.box} mt-5`} ref={rootRef}>
            <div className="pb-5" id="buns" ref={inViewBunRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tab.buns.type]}
              >
                {tab.buns.name}
              </h2>
              <ul className={`${styles.list} pt-5`}>
                {filteredBunIngredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    <BurgerIngredientCard
                      ingredient={ingredient}
                      onTab={handleOpenModalIngredient}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-5 pb-5" id="sauces" ref={inViewSauceRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tab.sauces.type]}
              >
                {tab.sauces.name}
              </h2>
              <ul className={`${styles.list} pt-5`}>
                {filteredSauceIngredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    <BurgerIngredientCard
                      ingredient={ingredient}
                      onTab={handleOpenModalIngredient}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-5 pb-5" id="fillings" ref={inViewFillingRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tab.fillings.type]}
              >
                {tab.fillings.name}
              </h2>
              <ul className={`${styles.list} pt-5`}>
                {filteredFillingIngredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    <BurgerIngredientCard
                      ingredient={ingredient}
                      onTab={handleOpenModalIngredient}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {isPopupIngredientOpened && (
          <Modal onClose={handleCloseModalIngredient} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        )}
      </>
    );
  }
};

export default React.memo(BurgerIngredients);
