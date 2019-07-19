import React, { Component } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { addToCart } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import { ScrollView } from "react-native-gesture-handler";
import { ApiCartUpdateCall } from "../../Components/ApiCartUpdateCall";
import IncDec from "../../Components/IncDec";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";

class ListItemDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Item Description",
      headerRight: (
        <View style={{ margin: 10, flexDirection: "row" }}>
          <CustomButton
            style={styles.buttonStyles}
            onPress={() => navigation.navigate("Cart")}
            title="Cart"
            color="#F4A460"
          />
        </View>
      ),
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
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      stockCheck: false,
      qty: 0,
      stock_qty: 0,
      cart: []
    };
  }
  HomePage() {
    this.props.navigation.navigate("Home");
  }

  componentDidMount = () => {
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
  };

  alertBoxCustom = () => {
    Alert.alert(
      "An item is added in your cart.",
      "To make the transaction move to your cart.",
      [
        {
          text: "Ok",
          onPress: () => this.HomePage()
        }
      ],
      { cancelable: true }
    );
  };

  ApiStockRead = product_id => {
    axios
      .get(Constants.STOCK_READ, { params: { product_id } })
      .then(response => {
        console.log(response.data);
        if (response.data.code == 200) {
          console.log(response.data);
          this.setState(() => ({
            stock_qty: response.data.productData.stock_qty
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const itemValue = this.props.navigation.getParam("itemValue");
    const quantity = this.props.navigation.getParam("quantity");
    console.log("listDetail stock", itemValue.stock_qty);
    console.log("listDetail quantity", quantity);
    console.log("listDetail quantity and id array", itemValue.product_id);
    // const cartItemQuantity = this.cartItemQty(this.state.cart);
    cartItemQty = () =>
      this.state.cart.map(item => {
        if (item.product_id === itemValue.product_id) return item.qty;
      });

    return (
      <View style={{ flex: 1, backgroundColor: "#FFEFD5" }}>
        <View style={styles.containerStyle}>
          <ScrollView style={styles.scrollViewStyle}>
            <Image
              style={{
                width: 100,
                height: 100
              }}
              source={{
                uri: itemValue.image
              }}
            />
            <ErrorBoundary>
              <CustomText
                style={styles.textStyles}
                title={`Product: ${itemValue.name}`}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <CustomText
                style={styles.textStyles}
                title={`Price: ${itemValue.price}`}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    color:
                      this.state.qty === itemValue.stock_qty ? "red" : "green"
                  }
                ]}
                title={
                  this.state.qty === itemValue.stock_qty
                    ? "Out of stock"
                    : "In stock"
                }
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <CustomText
                style={styles.textStyles}
                title={`Description: ${itemValue.description}`}
              />
            </ErrorBoundary>
          </ScrollView>
          <View style={{ flex: 0.2 }}>
            {!this.state.showIncDec ? (
              <CustomButton
                title="Add To Cart"
                color="#F4A460"
                onPress={() => {
                  if (itemValue.stock_qty == 1) {
                    this.setState({ stockCheck: true, qty: quantity + 1 });
                  } else {
                    this.setState({ stockCheck: false, qty: quantity + 1 });
                  }
                  ApiCartUpdateCall(
                    this.props.reducer.userProfile.user_id,
                    itemValue.product_id,
                    1
                  );
                  this.setState(() => ({
                    showIncDec: true
                  }));
                }}
                disabled={
                  itemValue.stock_qty === 0 || itemValue.stock_qty === quantity
                    ? true
                    : false
                }
              />
            ) : (
              <IncDec
                item={itemValue}
                stock_qty={itemValue.stock_qty}
                value={quantity + 1}
                product_id={itemValue.product_id}
                onValueUpdated={qtyValue => {
                  if (itemValue.stock_qty == qtyValue) {
                    this.setState({
                      stockCheck: true,
                      qty: qtyValue
                    });
                  } else {
                    this.setState({
                      stockCheck: false,
                      qty: qtyValue
                    });
                  }
                  this.props.addToCart(itemValue.product_id, qtyValue);
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToCart
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemDetail);

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    backgroundColor: "white",
    margin: 20,
    elevation: 30,
    padding: 30,
    flex: 1
  },
  textStyles: {
    fontSize: 18,
    flex: 0.5,
    color: "black",
    margin: 10
  },
  scrollViewStyle: {
    flexDirection: "column",
    flex: 0.8,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  }
});
