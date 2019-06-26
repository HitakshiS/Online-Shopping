import ActionTypes from "../../store/ActionTypes";

export const addCounterVal = id => {
  return {
    type: ActionTypes.ADD_VALUE,
    payload: id
  };
};
export const subCounterVal = id => {
  return {
    type: ActionTypes.SUB_VALUE,
    payload: id
  };
};
export const reset = id => {
  return {
    type: ActionTypes.RESET,
    payload: id
  };
};
export const addToCart = (id, qty) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { id, qty }
  };
};

export const hideCartBtn = id => {
  return {
    type: ActionTypes.HIDE_CART_BTN,
    payload: id
  };
};
