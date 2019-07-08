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
import { ApiCartUpdateCall } from "../../Components/ApiCartUpdateCall";

class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Cart"
  });

  ProfilePage() {
    this.props.navigation.navigate("Profile");
  }

  SuccessPage() {
    this.props.navigation.navigate("Success");
  }

  FailurePage() {
    this.props.navigation.navigate("Failure");
  }

  constructor() {
    super();
    this.state = {
      cart: []
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
    return (
      <View style={styles.containerStyles}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Product: ${item.name}`}
          />
          <View styles={{ paddingRight: 10 }}>
            <CustomButton
              onPress={() => {
                this.ApiCartRemoveItem(1, item.product_id, index);
              }}
              style={styles.buttonStyles}
              title="x"
              color="#ff0000"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Price: ${item.price}`}
          />
          <IncDec
            item={item}
            stock_qty={item.stock_qty}
            value={item.qty}
            // id={item.id}
            onValueUpdated={qtyValue => {
              this.props.addToCart(item.product_id, qtyValue);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText
            style={[styles.textStyles, { paddingBottom: 5 }]}
            title={`Amount: ${item.price * item.qty}`}
          />
        </View>
        <View style={{ flex: 1 }}>
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

  billingCost = b1 => b1.map(item => item.price * item.qty);

  Amount = c1 =>
    c1.reduce((total, currentValue) => {
      return total + currentValue;
    });

  componentDidMount() {
    axios
      .get(Constants.CART_API, { params: { user_id: 1 } })
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
      <View style={{ flex: 1, padding: 10 }}>
        {this.state.cart ? (
          <FlatList
            style={{ flex: 0.8 }}
            data={this.state.cart}
            renderItem={this.renderItem}
          />
        ) : (
          <CustomText
            style={styles.emptyTextStyle}
            title="Your shopping list is empty! Fill in your cart."
          />
        )}
        {this.state.cart && (
          <View style={{ flex: 0.2 }}>
            <CustomText
              style={[
                styles.textStyles,
                {
                  textAlign: "center",
                  fontSize: 24,
                  backgroundColor: "#9370DB",
                  marginBottom: 10
                }
              ]}
              title={`Total amount: ${TotalAmount}`}
            />
            <CustomButton
              style={[styles.buttonStyles, { flex: 0.1 }]}
              title="Place Your Order"
              color="#7a42f4"
              onPress={() => {
                Object.getOwnPropertyNames(this.props.reducer.userProfile)
                  .length === 0
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
    backgroundColor: "#BFEFFF",
    borderWidth: 3,
    borderColor: "black"
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
