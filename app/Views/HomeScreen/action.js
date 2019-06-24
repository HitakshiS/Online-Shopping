import ActionTypes from "../../store/ActionTypes";

export const addCounterVal = () => {
  return {
    type: ActionTypes.ADD_VALUE
  };
};
export const subCounterVal = () => {
  return {
    type: ActionTypes.SUB_VALUE
  };
};
export const reset = () => {
  return {
    type: ActionTypes.RESET
  };
};
