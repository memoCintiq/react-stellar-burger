export const ADD_INGREDIENTS_CONSTRUCTOR = "ADD_INGREDIENTS_CONSTRUCTOR";
export const ADD_INGREDIENTS_CONSTRUCTOR_BUN = "ADD_INGREDIENTS_CONSTRUCTOR_BUN";
export const DELETE_INGREDIENTS_CONSTRUCTOR = "DELETE_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR = "CLEAR_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR_BUN = "CLEAR_INGREDIENTS_CONSTRUCTOR_BUN";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const addIngredientsConstructor = (item, keyUuid) => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR,
    ingredients: item,
    key: keyUuid,
  };
};

export const addIngredientsConstructorBun = (item) => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR_BUN,
    bun: item,
  };
};

export const clearIngredientsConstructor = () => {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR,
  };
};

export const clearIngredientsConstructorBun = () => {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR_BUN,
  };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
};
