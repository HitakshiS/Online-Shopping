import ActionTypes from "../../store/ActionTypes";

export const addCounterVal = () => {
  return {
    type: ActionTypes.ADD_VALUE,
    payload: id
  };
};
export const subCounterVal = () => {
  return {
    type: ActionTypes.SUB_VALUE,
    payload: id
  };
};
export const reset = () => {
  return {
    type: ActionTypes.id,
    payload: id
  };
};
