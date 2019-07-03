import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import HomeScreen from "../Views/HomeScreen";
import Cart from "../Views/Cart";
import ListItemDetail from "../Views/ListItemDetail";
import Profile from "../Views/Profile";
import Success from "../Views/SuccessFailure/Success";
import Failure from "../Views/SuccessFailure/Failure";
import PurchasedList from "../Views/PurchasedList";
import SignIn from "../Views/Login/SignIn";
import SignUp from "../Views/Login/SignUp";
import Login from "../Views/Login";

const AppNavigatorOne = createStackNavigator(
  {
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
    }
  },
  { initialRouteName: "Home" }
);

const AppNavigatorTwo = createStackNavigator(
  {
    Login: Login,
    SignIn: SignIn,
    SignUp: SignUp
  },
  { initialRouteName: "Login" }
);

const OrderPurchasedList = createStackNavigator(
  {
    PurchasedList: PurchasedList
  },
  { initialRouteName: "PurchasedList" }
);

const MyDrawerNavigator = createDrawerNavigator({
  AppNavigatorOne,
  OrderPurchasedList: OrderPurchasedList
});

const MySwitchNavigator = createSwitchNavigator({
  AppNavigatorTwo,
  MyDrawerNavigator
});

export default createAppContainer(MySwitchNavigator);
