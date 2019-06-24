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
  ],

  cartList: [],

  purchasedList: []
};

export default (CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.PAYMENT_SUCCESSFUL:
      return INITIAL_STATE;

    case ActionTypes.PAYMENT_FAIL:
      return state;

    case ActionTypes.ADD_VALUE: {
      return {
        ...state,
        exampleData: state.exampleData.map(data => {
          if (data.id === action.payload) {
            return { ...data, stock: data.stock + 1 };
          } else {
            return data;
          }
        })
      };
    }

    case ActionTypes.SUB_VALUE: {
      return {
        ...state,
        exampleData: state.exampleData.map(data => {
          if (data.id === action.payload) {
            return { ...data, stock: data.stock - 1 };
          } else {
            return data;
          }
        })
      };
    }

    case ActionTypes.RESET: {
      return {
        ...state,
        exampleData: state.exampleData.map(data => {
          if (data.id === action.payload) {
            return { ...data, stock: 0 };
          } else {
            return data;
          }
        })
      };
    }

    default:
      return state;
  }
});
