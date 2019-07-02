import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import HomeScreen from "../Views/HomeScreen";
import Cart from "../Views/Cart";
import ListItemDetail from "../Views/ListItemDetail";
import Profile from "../Views/Profile";
import Success from "../Views/SuccessFailure/Success";
import Failure from "../Views/SuccessFailure/Failure";
import PurchasedList from "../Views/PurchasedList";
import SignIn from "../Views/login/SignIn";
import SignUp from "../Views/login/SignUp";

const AppNavigatorOne = createStackNavigator({
  SignIn: {
    screen: SignIn
  },
  Home: {
    screen: HomeScreen
  },
  Cart: {
    screen: Cart
  },
  ListItemDetail: {
    screen: ListItemDetail
  },
  Profile: {
    screen: Profile
  },
  Success: {
    screen: Success
  },
  Failure: {
    screen: Failure
  },
  PurchasedList: {
    screen: PurchasedList
  },
  SignUp: {
    screen: SignUp
  }
});

const OrderPurchasedList = createStackNavigator({
  OrderPurchasedList: {
    screen: PurchasedList
  }
});

const MyDrawerNavigator = createDrawerNavigator({
  AppNavigatorOne: AppNavigatorOne,
  OrderPurchasedList: OrderPurchasedList
});
export default createAppContainer(MyDrawerNavigator);
