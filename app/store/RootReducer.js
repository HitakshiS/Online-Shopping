import HomeReducer from "../Views/HomeScreen/HomeReducer";
import CartReducer from "../Views/Cart/CartReducer";

import { combineReducers } from "redux";

export default combineReducers({
  HomeReducer,
  CartReducer
});
