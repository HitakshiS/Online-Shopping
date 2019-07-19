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
export const reset = (index, product_id) => {
  return {
    type: ActionTypes.RESET,
    payload: { index, product_id }
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

export const userProfile = userProfileDetails => {
  return {
    type: ActionTypes.USER_PROFILE,
    payload: userProfileDetails
  };
};

export const emptyCartList = () => {
  return {
    type: ActionTypes.EMPTY_CART_LIST
  };
};

export const exampleData = (id, name, stockQty, price, description, image) => {
  return {
    type: ActionTypes.EXAMPLE_DATA,
    payload: { id, name, stockQty, price, description, image }
  };
};

export const logOut = () => {
  return {
    type: ActionTypes.LOG_OUT
  };
};

export const cop = cart => {
  return {
    type: ActionTypes.COPY,
    payload: cart
  };
};
