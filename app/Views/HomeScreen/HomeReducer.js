import ActionTypes from "../../store/ActionTypes";
import Images from "../../AppConfig/Images";

const INITIAL_STATE = {
  exampleData: [],
  cartList: [],
  userProfile: {},
  purchaseList: []
};

export default (HomeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.PAYMENT_SUCCESSFUL:
      return INITIAL_STATE;
      s;
    case ActionTypes.PAYMENT_FAIL:
      return state;

    case ActionTypes.ADD_VALUE: {
      return {
        ...state,
        exampleData: state.exampleData.map(data => {
          if (data.id === action.payload) {
            return { ...data, stock: data.stock - 1 };
          } else {
            return data;
          }
        }),
        cartList: state.cartList.push({
          id: action.payload,
          qty: 1
        })
      };
    }

    case ActionTypes.SUB_VALUE: {
      return {
        ...state,
        exampleData: state.exampleData.map(data => {
          if (data.id === action.payload) {
            return { ...data, stock: data.stock + 1 };
          } else {
            return data;
          }
        }),
        cartList: state.cartList.pop({
          id: action.payload,
          qty: 1
        })
      };
    }

    case ActionTypes.RESET: {
      let updatedCartList = [...state.cartList];
      updatedCartList.splice(action.payload, 1);

      return {
        ...state,
        cartList: updatedCartList
      };
    }

    case ActionTypes.ADD_TO_CART: {
      // let index = cartList.findIndex(i => i.id === action.object.id);

      return {
        ...state,
        cartList:
          state.cartList.length > 0
            ? state.cartList.findIndex(item => item.id === action.payload.id) >
              -1
              ? state.cartList.map(data => {
                  if (data.id === action.payload.id) {
                    return { ...data, qty: action.payload.qty };
                  } else {
                    return data;
                  }
                })
              : [
                  ...state.cartList,
                  { id: action.payload.id, qty: action.payload.qty }
                ]
            : [{ id: action.payload.id, qty: action.payload.qty }]
      };
    }

    case ActionTypes.HIDE_CART_BTN: {
      return {
        ...state,
        exampleData:
          state.cartList.length > 0
            ? state.exampleData.map(data => {
                if (data.id === action.payload) {
                  return { ...data, showIncDec: true };
                } else {
                  return data;
                }
              })
            : null
      };
    }
    case ActionTypes.USER_PROFILE: {
      return {
        ...state,
        userProfile: { ...action.payload }
      };
    }

    case ActionTypes.EMPTY_CART_LIST: {
      return {
        ...state,
        cartList: [],
        purchaseList: [...state.cartList]
      };
    }

    case ActionTypes.EXAMPLE_DATA: {
      return {
        ...state,
        exampleData: { ...action.payload }
      };
    }

    default:
      return state;
  }
});
