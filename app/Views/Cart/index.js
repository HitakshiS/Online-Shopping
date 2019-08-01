import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  AsyncStorage,
  BackHandler
} from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";
import { connect } from "react-redux";
import { addToCart, reset, logOut, cop } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { NavigationActions, StackActions } from "react-navigation";
import ErrorBoundary from "../../Components/ErrorBoundary";
import CartItem from "./CartItem";

class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#F4A460"
    },
    headerTitle: "Cart",
    headerLeft: (
      <View style={{ padding: 10 }}>
        <CustomButton
          color="#F4A460"
          title="Back"
          onPress={() =>
            navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Home" })]
              })
            )
          }
        />
      </View>
    ),
    headerRight: (
      <View style={{ padding: 10 }}>
        <CustomButton
          title="LogOut"
          onPress={() => {
            const logOutFn = navigation.getParam("logOutFn");

            logOutFn();
          }}
          color="#F4A460"
        />
      </View>
    )
  });

  constructor() {
    super();
    this.state = {
      cart: [],
      Quantity: "",
      price: 0,
      stock_qty: 0,
      total_bill: 0,
      totalBill: 0,
      removeAmount: 0
    };
    this.backHandler = null;
  }

  goBack = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      })
    );

    return true;
  };

  logOutFn = async () => {
    console.log("=====>");

    Alert.alert(
      null,
      "Are you sure you want to LogOut",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            this.props.logOut();
            await AsyncStorage.removeItem("userExist");
            this.props.navigation.navigate("SignIn");
          }
        }
      ],
      { cancelable: true }
    );
  };

  ProfilePage() {
    this.props.navigation.navigate("Profile");
  }

  SuccessPage = () => {
    this.ApiSuccessfulPaymentAll(
      this.props.reducer.userProfile.user_id,
      this.props.navigation.getParam("addressId")
    );
  };

  ApiSuccessfulPaymentAll = (user_id, address_id) => {
    axios
      .post(Constants.SUCCESSFUL_PAYMENT_ALL, { user_id, address_id })
      .then(response => {
        if (response.data.code == 200) {
          this.props.navigation.navigate("Success", {
            response: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  FailurePage() {
    this.props.navigation.navigate("Failure");
  }

  ApiCartRemoveItem = (user_id, product_id, index) => {
    axios
      .post(Constants.REMOVE_ITEM, { user_id, product_id })
      .then(response => {
        if (response.data.code == 200) {
          console.log("Remove Prod_id,index======>", product_id, index);
          console.log("cartList", this.props.reducer.cartList);
          this.setState(
            {
              cart: []
            },
            () => {
              this.getCartItems();
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  calculateAmount = () => {
    const billing = this.props.reducer.cartList
      ? this.billingCost(this.props.reducer.cartList)
      : null;

    return this.state.cart.length ? this.Amount(billing) : null;
  };

  renderItem = ({ item, index }) => {
    return (
      <CartItem
        item={item}
        key={`cart_${index}`}
        index={index}
        onRemovePress={() => {
          this.ApiCartRemoveItem(
            this.props.reducer.userProfile.user_id,
            item.product_id,
            index
          );
        }}
        onValueUpdated={(qtyValue, totalBill) => {
          this.setState({ totalBill });
          this.props.addToCart(item.product_id, qtyValue);
        }}
      />
    );
  };

  alertBoxCustom = () => {
    Alert.alert(
      "Payment Information",
      `Congratulation!! ${
        this.props.reducer.userProfile.name
      } now choose Success for successful transaction`,
      [
        {
          text: "Success",
          onPress: () => {
            this.SuccessPage();
          }
        },
        { text: "Failure", onPress: () => this.FailurePage() }
      ],
      { cancelable: true }
    );
  };

  billingCost = b1 =>
    b1.map(item => item.cartItemPrice * item.cartItemQuantity);
  cartItemQty = q1 => q1.map(item => item.qty);
  cartItemPrc = p1 => p1.map(item => item.price);

  Amount = (a1, a2) =>
    a1.reduce((r, a, i) => {
      return r + a * a2[i];
    }, 0);

  componentDidMount() {
    this.props.navigation.setParams({ logOutFn: this.logOutFn });

    if (this.backHandler) {
      this.backHandler.remove();
    }

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.goBack
    );

    this.getCartItems();
  }

  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  getCartItems = () => {
    axios
      .get(Constants.CART_API, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data.cartData);

          this.setState(
            {
              cart: response.data.cartData
            },
            () => {
              const cartItemQty = this.state.cart.map(item => item.qty);
              const cartItemPrc = this.state.cart.map(item => item.price);

              const AmountRemove = cartItemQty.reduce((r, a, i) => {
                return r + a * cartItemPrc[i];
              }, 0);

              this.setState({
                removeAmount: AmountRemove,
                totalBill: AmountRemove
              });
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const cartItemQuantity = this.cartItemQty(this.state.cart);
    const cartItemPrice = this.cartItemPrc(this.state.cart);
    const finalAmount =
      cartItemQuantity &&
      cartItemPrice.length &&
      cartItemPrice &&
      cartItemQuantity.length
        ? this.Amount(cartItemQuantity, cartItemPrice)
        : 0;

    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: "#FFEFD5" }}>
        {this.state.cart.length > 0 ? (
          <FlatList
            style={{ flex: 0.8, marginBottom: 20 }}
            data={this.state.cart}
            renderItem={this.renderItem}
            extraData={this.state}
          />
        ) : (
          <CustomText
            style={[
              styles.emptyTextStyle,
              { flex: 1, backgroundColor: "#FFEFD5" }
            ]}
            title="Your shopping list is empty! Fill in your cart."
          />
        )}
        {this.state.cart.length > 0 && (
          <View style={{ flex: 0.2 }}>
            <CustomText
              style={[
                styles.textStyles,
                {
                  textAlign: "center",
                  fontSize: 24,
                  backgroundColor: "white",
                  marginBottom: 10
                }
              ]}
              title={`Total amount: ₹${
                this.state.totalBill > 0
                  ? this.state.totalBill
                  : this.state.removeAmount != 0
                  ? this.state.removeAmount
                  : finalAmount
              }`}
            />
            <CustomButton
              style={[styles.buttonStyles, { flex: 0.1 }]}
              title="Place Your Order"
              color="#F4A460"
              onPress={() => {
                !this.props.navigation.getParam("addressId")
                  ? this.ProfilePage()
                  : this.alertBoxCustom();
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyles: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0.4,
    backgroundColor: "white",
    elevation: 30
  },
  buttonStyles: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 30
  },
  textStyles: {
    fontSize: 20,
    flex: 1,
    color: "black",
    marginLeft: 10,
    marginRight: 10
  },
  emptyTextStyle: {
    fontSize: 20,
    color: "#7a42f4",
    flex: 1,
    textAlign: "center",
    backgroundColor: "white"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToCart,
      reset,
      logOut,
      cop
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
