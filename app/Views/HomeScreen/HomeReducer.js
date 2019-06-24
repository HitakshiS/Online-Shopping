import ActionTypes from "../../store/ActionTypes";
import { combineReducers } from "redux";
import Images from "../../AppConfig/Images";

const INITIAL_STATE = {
  exampleData: [
    {
      id: 1,
      name: "Perfume",
      price: 100,
      stock: 10,
      image: Images.carrot
    },
    {
      id: 2,
      name: "Carrot",
      price: 10,
      stock: 5,
      image: Images.carrot
    },
    {
      id: 3,
      name: "Cucumber",
      price: 15,
      stock: 1,
      image: Images.carrot
    },
    {
      id: 4,
      name: "Cucumber",
      price: 15,
      stock: 1,
      image: Images.carrot
    },
    {
      id: 5,
      name: "Tissue",
      price: 15,
      stock: 1,
      image: Images.carrot
    }
  ]
};

export default (HomeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_VALUE: {
      return { ...state, cart: state.cart + 1 };
    }
    case ActionTypes.SUB_VALUE: {
      return { ...state, cart: state.cart - 1 };
    }
    case ActionTypes.RESET: {
      return { ...state, cart: 0 };
    }
    default:
      return state;
  }
});
