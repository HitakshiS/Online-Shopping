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
      cart: [],
      home: []
    };
  }

  ApiCartRemoveItem = (userId, id, index) => {
    axios
      .post(Constants.REMOVE_ITEM, { userId, id })
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
                this.ApiCartRemoveItem(2, item.id, index);
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
            stock={item.stock}
            value={item.qty}
            // id={item.id}
            onValueUpdated={qtyValue => {
              this.props.addToCart(item.id, qtyValue);
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
                color: item.qty === item.stock ? "red" : "green",
                paddingBottom: 5
              }
            ]}
            title={item.qty >= item.stock ? "Out of stock" : "In stock"}
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

  componentDidMount() {
    axios
      .get(Constants.STOCK_API)
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data.stockData);
          // const data = response.stockData;
          this.setState(() => ({
            home: response.data.stockData
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .post(Constants.CART_API, { userId })
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

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.id === itm.id && item),
      ...itm
    }));

  billingCost = b1 => b1.map(item => item.price * item.qty);

  Amount = c1 =>
    c1.reduce((total, currentValue) => {
      return total + currentValue;
    });

  render() {
    userId = 2;
    const cartValues = this.state.cart.length
      ? this.mergeById(this.state.cart, this.state.home)
      : null;

    const billing = this.state.cart.length
      ? this.billingCost(cartValues)
      : null;

    const TotalAmount = this.state.cart.length ? this.Amount(billing) : null;

    return (
      <View style={{ flex: 1, padding: 10 }}>
        {cartValues ? (
          <FlatList
            style={{ flex: 0.8 }}
            data={cartValues}
            renderItem={this.renderItem}
          />
        ) : (
          <CustomText
            style={styles.emptyTextStyle}
            title="Your shopping list is empty! Fill in your cart."
          />
        )}
        {cartValues && (
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

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}

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
