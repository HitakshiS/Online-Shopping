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

const AppNavigatorOne = createStackNavigator({
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
});
const MyDrawerNavigator = createDrawerNavigator({
  AppNavigatorOne: AppNavigatorOne,
  OrderPurchasedList: {
    screen: PurchasedList
  }
});
export default createAppContainer(MyDrawerNavigator);
