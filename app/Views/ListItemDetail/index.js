import React, { Component } from "react";
import { View, Image, StyleSheet, Alert, BackHandler } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { addToCart } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import { ScrollView } from "react-native-gesture-handler";
import { ApiCartUpdateCall } from "../../Components/ApiCartUpdateCall";
import IncDec from "../../Components/IncDec";
import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class ListItemDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Item Description",
      headerForceInset: { top: "never", bottom: "never" },
      headerRight: (
        <View style={{ flex: 1, marginRight: moderateScale(10) }}>
          <CustomButton
            style={styles.buttonStyles}
            onPress={() => navigation.navigate("Cart")}
            title="Cart"
            color="#F4A460"
          />
        </View>
      ),
      headerLeft: (
        <View style={{ flex: 1, marginLeft: moderateScale(10) }}>
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
      cart: [],
      showIncDec: false,
      newQty1: ""
    };
    this.backHandler = null;
  }

  homePage = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      })
    );
    return true;
  };

  getCartItems = () => {
    axios
      .get(Constants.CART_API, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log("cartData", response.data.cartData);

          this.setState(
            {
              cart: response.data.cartData
            },
            () => {
              const item = this.props.navigation.getParam("itemValue");

              for (var j = 0; j < this.state.cart.length; j++) {
                if (this.state.cart[j].product_id === item.product_id) {
                  this.setState({ newQty1: this.state.cart[j].qty }, () => {
                    if (this.state.newQty1 != "") {
                      this.setState({
                        showIncDec: true,
                        qty: parseInt(this.state.newQty1, 10)
                      });
                    } else {
                      this.setState({
                        qty: 0
                      });
                    }
                  });
                }
              }
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getCartItems();
    const item = this.props.navigation.getParam("itemValue");

    if (this.backHandler) {
      this.backHandler.remove();
    }
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.homePage
    );
  };

  componentWillUnmount = () => {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  };

  render() {
    const itemValue = this.props.navigation.getParam("itemValue");

    let newQty = "";
    for (var j = 0; j < this.state.cart.length; j++) {
      if (this.state.cart[j].product_id === itemValue.product_id) {
        newQty = this.state.cart[j].qty;
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#FFEFD5" }}>
        <View style={styles.containerStyle}>
          <ScrollView style={styles.scrollViewStyle}>
            <Image
              style={{
                width: scale(300),
                height: verticalScale(300),
                flex: 1,
                alignSelf: "center"
              }}
              source={{
                uri: itemValue.image
              }}
              resizeMode="contain"
            />

            <CustomText
              style={[
                styles.textStyles,
                { fontWeight: "bold", fontSize: moderateScale(20) }
              ]}
              title={`${itemValue.name}`}
            />

            <CustomText
              style={[
                styles.textStyles,
                {
                  fontWeight: "bold",
                  fontSize: moderateScale(20),
                  color: "red"
                }
              ]}
              title={`₹${itemValue.price}`}
            />

            <CustomText
              style={[
                styles.textStyles,
                {
                  color:
                    this.state.qty === itemValue.stock_qty ? "red" : "green",
                  fontSize: moderateScale(20)
                }
              ]}
              title={
                this.state.qty === itemValue.stock_qty
                  ? "Out of stock"
                  : "In stock"
              }
            />

            <CustomText
              style={styles.textStyles}
              title={`Description:  ${itemValue.description}`}
            />
          </ScrollView>
          <View style={{ flex: 0.1}}>
            {!this.state.showIncDec ? (
              <CustomButton
                style = {{borderRadius: moderateScale(30)}}
                title="Add To Cart"
                color="#F4A460"
                onPress={() => {
                  if (itemValue.stock_qty == 1) {
                    if (this.state.qty == 0)
                      this.setState({
                        stockCheck: true,
                        qty: 1
                      });
                  } else {
                    this.setState({
                      stockCheck: false,
                      qty: 1
                    });
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
                  itemValue.stock_qty === 0 || itemValue.stock_qty === newQty
                    ? true
                    : false
                }
              />
            ) : (
              <IncDec
                item={itemValue}
                stock_qty={itemValue.stock_qty}
                value={parseInt(newQty, 10)}
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

const styles = ScaledSheet.create({
  containerStyle: {
    flexDirection: "column",
    backgroundColor: "white",
    margin: "20@ms",
    elevation: "30@ms",
    padding: "10@ms",
    flex: 1
  },
  textStyles: {
    fontSize: "18@ms",
    flex: 0.5,
    color: "black",
    marginBottom: "10@ms"
  },
  scrollViewStyle: {
    flexDirection: "column",
    flex: 0.8,
    marginLeft: "10@ms",
    marginBottom: "10@ms"
  }
});
