import ActionTypes from "../../store/ActionTypes";
import Images from "../../AppConfig/Images";

const INITIAL_STATE = {
  exampleData: [
    {
      id: 1,
      name: "Broccoli",
      price: 50,
      stock: 10,
      image: Images.broccoli,
      showIncDec: false,
      description:
        "With a shape resembling that of a cauliflower, Broccoli have clusters of small, tight flower heads. These heads turn bright green on cooking and tastes slightly bitter."
    },
    {
      id: 2,
      name: "Carrot",
      price: 18,
      stock: 5,
      image: Images.carrot,
      showIncDec: false,
      description:
        "A popular sweet-tasting root vegetable, Carrots are narrow and cone shaped. They have thick, fleshy, deeply colored root, which grows underground, and feathery green leaves that emerge above the ground. While these greens are fresh tasting and slightly bitter, the carrot roots are crunchy textured with a sweet and minty aromatic taste"
    },
    {
      id: 3,
      name: "Cucumber",
      price: 32,
      stock: 7,
      image: Images.cucumber,
      showIncDec: false,
      description:
        "With high water content and crunchy flesh, Cucumbers have striped, light to dark green coloured skin that is edible."
    },
    {
      id: 4,
      name: "Capsicum",
      price: 35,
      stock: 12,
      image: Images.capsicum,
      showIncDec: false,
      description:
        "Leaving a moderately pungent taste on the tongue, Green capsicums, also known as green peppers are bell shaped, medium-sized fruit pods. They have thick and shiny skin with a fleshy texture inside."
    },
    {
      id: 5,
      name: "Tomato",
      price: 21,
      stock: 5,
      image: Images.tomato,
      showIncDec: false,
      description:
        "Tomato Hybrids are high-quality fruits compared to desi, local tomatoes. They contain numerous edible seeds and are red in colour due to lycopene, an anti-oxidant."
    }
  ],

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
        exampleData: state.exampleData.map(data => {
          if (data.id === action.payload) {
            return { ...data, showIncDec: true };
          } else {
            return data;
          }
        })
      };
    }
    case ActionTypes.USER_PROFILE: {
      return {
        ...state,
        userProfile: { ...action.payload }
      };
    }

    default:
      return state;
  }
});
