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
import PurchasedList from "../Views/PurchasedList/PurchasedList";
import Order from "../Views/PurchasedList/Order";
import SignIn from "../Views/Login/SignIn";
import SignUp from "../Views/Login/SignUp";
import Login from "../Views/Login";
import Authentication from "../Views/Login/Authentication";

const HomePage = createStackNavigator(
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
    },
    Authentication: {
      screen: Authentication
    },
    SignIn: {
      screen: SignIn
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

const MyOrders = createStackNavigator(
  {
    Order: Order,
    PurchasedList: PurchasedList,
    Home: HomeScreen
  },
  { initialRouteName: "Order" }
);

const MyDrawerNavigator = createDrawerNavigator({
  HomePage,
  MyOrders: MyOrders
});

const MySwitchNavigator = createSwitchNavigator(
  {
    Authentication: Authentication,
    MyDrawerNavigator: MyDrawerNavigator,
    AppNavigatorTwo: AppNavigatorTwo
  },
  {
    initialRouteName: "Authentication"
  }
);

export default createAppContainer(MySwitchNavigator);
