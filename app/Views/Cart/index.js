import React, { Component } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";
import { connect } from "react-redux";
import { addToCart, reset } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { NavigationActions, StackActions } from "react-navigation";
import ErrorBoundary from "../../Components/ErrorBoundary";

class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#F4A460"
    },
    headerTitle: "Cart",
    headerLeft: (
      <View style={{ padding: 10 }}>
        <CustomButton
          color="#E9967A"
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
    )
  });

  ProfilePage() {
    this.props.navigation.navigate("Profile");
  }

  SuccessPage = () => {
    this.ApiSuccessfulPaymentAll(
      this.props.reducer.userProfile.user_id,
      this.props.navigation.getParam("addressId")
    );
    this.props.navigation.navigate("Success", {
      cartData: this.state.cart
    });
  };

  ApiSuccessfulPaymentAll = (user_id, address_id) => {
    axios
      .post(Constants.SUCCESSFUL_PAYMENT_ALL, { user_id, address_id })
      .then(response => {
        console.log(response.data);
        if (response.data.code == 200) {
          console.log(response.data);
          this.props.navigation.navigate("Success", {
            cartData: this.state.cart
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ApiStockRead = product_id => {
  //   axios
  //     .get(Constants.STOCK_READ, { params: { product_id } })
  //     .then(response => {
  //       console.log(response.data);
  //       if (response.data.code == 200) {
  //         console.log(response.data);
  //         this.setState(() => ({
  //           stock_qty: response.data.productData.stock_qty
  //         }));
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  FailurePage() {
    this.props.navigation.navigate("Failure");
  }

  constructor() {
    super();
    this.state = {
      cart: [],
      Quantity: 0
    };
  }

  ApiCartRemoveItem = (user_id, product_id, index) => {
    axios
      .post(Constants.REMOVE_ITEM, { user_id, product_id })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data);
          let cardTemp = [...this.state.cart];
          cardTemp.splice(index, 1);
          this.setState({
            cart: [...cardTemp]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderItem = ({ item, index }) => {
    const quantity = !this.state.Quantity ? item.qty : this.state.Quantity;
    return (
      // <ErrorBoundary>
      <View style={styles.containerStyles}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ErrorBoundary>
            <CustomText
              style={styles.textStyles}
              title={`Product: ${item.name}`}
            />
          </ErrorBoundary>
          <View styles={{ paddingRight: 10 }}>
            <CustomButton
              onPress={() => {
                this.ApiCartRemoveItem(
                  this.props.reducer.userProfile.user_id,
                  item.product_id,
                  index
                );
              }}
              style={styles.buttonStyles}
              title="x"
              color="#ff0000"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ErrorBoundary>
            <CustomText
              style={styles.textStyles}
              title={`Price: ${item.price}`}
            />
          </ErrorBoundary>
          <IncDec
            item={item}
            // stock_qty={this.state.stock_qty}
            value={item.qty}
            product_id={item.product_id}
            onValueUpdated={qtyValue => {
              this.setState({
                Quantity: qtyValue ? qtyValue : item.qty
              });
              this.props.addToCart(item.product_id, qtyValue);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ErrorBoundary>
            <CustomText
              style={[styles.textStyles, { paddingBottom: 5 }]}
              title={`Amount: ${item.price * quantity}`}
            />
          </ErrorBoundary>
        </View>
        <View style={{ flex: 1 }}>
          <ErrorBoundary>
            <CustomText
              style={[
                styles.textStyles,
                {
                  color: item.qty === item.stock_qty ? "red" : "green",
                  paddingBottom: 5
                }
              ]}
              title={item.qty >= item.stock_qty ? "Out of stock" : "In stock"}
            />
          </ErrorBoundary>
        </View>
      </View>
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

  billingCost = b1 => b1.map(item => item.price * this.state.Quantity);

  Amount = c1 =>
    c1.reduce((total, currentValue) => {
      return total + currentValue;
    });

  componentDidMount() {
    axios
      .get(Constants.CART_API, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data.cartData);

          this.setState(() => ({
            cart: response.data.cartData
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const billing = this.state.cart.length
      ? this.billingCost(this.state.cart)
      : null;

    const TotalAmount = this.state.cart.length ? this.Amount(billing) : null;

    return (
      // <ErrorBoundary>
      <View style={{ flex: 1, padding: 10, backgroundColor: "#FFEFD5" }}>
        {this.state.cart.length > 0 ? (
          <FlatList
            style={{ flex: 0.8, marginBottom: 20 }}
            data={this.state.cart}
            renderItem={this.renderItem}
            extraData={this.state.Quantity}
          />
        ) : (
          <CustomText
            style={styles.emptyTextStyle}
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
                  backgroundColor: "#FFA07A",
                  marginBottom: 10
                }
              ]}
              title={`Total amount: ${TotalAmount}`}
            />
            <CustomButton
              style={[styles.buttonStyles, { flex: 0.1 }]}
              title="Place Your Order"
              color="#E9967A"
              onPress={() => {
                !this.props.navigation.getParam("addressId")
                  ? this.ProfilePage()
                  : this.alertBoxCustom();
              }}
            />
          </View>
        )}
      </View>
      // </ErrorBoundary>
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
    textAlign: "center"
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
      reset
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
