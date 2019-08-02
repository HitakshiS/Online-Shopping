import ActionTypes from "../../store/ActionTypes";

const INITIAL_STATE = {
  exampleData: [],
  cartList: [],
  userProfile: {},
  purchaseList: [],
  TotalBill: 0,
  randomData: [],
  categoryData: [],
  existSearch: true
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
      var index = updatedCartList.findIndex(
        p => p.product_id == action.payload.product_id
      );
      updatedCartList.splice(index, 1);
      return {
        ...state,
        cartList: updatedCartList
      };
    }

    case ActionTypes.COPY: {
      let updatedCartList = action.payload;
      return {
        ...state,
        cartList: updatedCartList
      };
    }

    case ActionTypes.ADD_TO_CART: {
      return {
        ...state,
        cartList:
          state.cartList.length > 0
            ? state.cartList.findIndex(
                item => item.product_id === action.payload.id
              ) > -1
              ? state.cartList.map(data => {
                  if (data.product_id === action.payload.id) {
                    return { ...data, qty: action.payload.qty };
                  } else {
                    return data;
                  }
                })
              : [
                  ...state.cartList,
                  { product_id: action.payload.id, qty: action.payload.qty }
                ]
            : [{ product_id: action.payload.id, qty: action.payload.qty }]
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
        exampleData: [...action.payload]
      };
    }

    case ActionTypes.LOG_OUT: {
      return {
        ...INITIAL_STATE
      };
    }

    case ActionTypes.TOTAL_BILL: {
      let total_bill = action.payload;
      return {
        TotalBill: total_bill
      };
    }

    case ActionTypes.RANDOM_DATA: {
      let randomDataList = action.payload;
      return {
        ...state,
        randomData: randomDataList,
        existSearch: false
      };
    }

    case ActionTypes.CATEGORY_DATA: {
      let categoryDataList = action.payload;
      return {
        ...state,
        categoryData: categoryDataList
      };
    }

    case ActionTypes.EXIST_SEARCH: {
      return {
        existSearch: true
      };
    }

    default:
      return state;
  }
});
