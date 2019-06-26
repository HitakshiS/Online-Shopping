import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import HomeScreen from "../Views/HomeScreen";
import Cart from "../Views/Cart";
import ListItemDetail from "../Views/ListItemDetail";
import Profile from "../Views/Profile";

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
  }
});
const MyDrawerNavigator = createDrawerNavigator({
  AppNavigatorOne: AppNavigatorOne,
  Cart: {
    screen: Cart
  }
});
export default createAppContainer(MyDrawerNavigator);
