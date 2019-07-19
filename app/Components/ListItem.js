import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import IncDec from "./IncDec";
import { ApiCartUpdateCall } from "./ApiCartUpdateCall";
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import { addToCart } from "../Views/HomeScreen/action";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockCheck: false,
      qty: 0,
      showIncDec: false,
      cart: []
    };
  }

  ApiGetCartCall = () => {
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

  render() {
    const {
      item,
      isPurchaseList,
      onValueUpdated,
      listDetailNavigation
    } = this.props;

    const cartValues = this.state.cart.map(id => ({
      ...a2.find(item => item.id === id.id && item),
      ...id
    }));
    console.log("home addtocart");
    //console.log("In home=======>name,item.qty", item.name, item.qty);
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          listDetailNavigation && listDetailNavigation(item, this.state.qty)
        }
      >
        <View style={[styles.containerStyles, { flexDirection: "column" }]}>
          <View style={{ flex: 1 }}>
            <ErrorBoundary>
              <Image style={{ flex: 1 }} source={item.image} />
            </ErrorBoundary>
            <View style={styles.listSubContainer}>
              <ErrorBoundary>
                <CustomText
                  style={styles.textStyles}
                  title={`Product: ${item.name}`}
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <CustomText
                  style={styles.textStyles}
                  title={`Quantity: ${item.qty ? item.qty : this.state.qty}`}
                  //
                />
              </ErrorBoundary>
              <ErrorBoundary>
                <CustomText
                  style={styles.textStyles}
                  title={`Price: ${item.price}`}
                />
              </ErrorBoundary>
              {!isPurchaseList && (
                <CustomText
                  style={[
                    styles.textStyles,
                    {
                      color:
                        item.stock_qty === 0 || this.state.stockCheck
                          ? "red"
                          : "green",
                      fontSize: 20
                    }
                  ]}
                  title={
                    item.stock_qty === 0 || this.state.stockCheck
                      ? "Out of stock"
                      : "In stock"
                  }
                />
              )}
            </View>
          </View>
          {!isPurchaseList && (
            <View style={styles.buttonContainer}>
              {!this.state.showIncDec && (
                <CustomButton
                  title="Add To Cart"
                  color="#F4A460"
                  onPress={() => {
                    if (item.stock_qty == 1) {
                      this.setState({ stockCheck: true, qty: 1 });
                    } else {
                      this.setState({ stockCheck: false, qty: 1 });
                    }
                    ApiCartUpdateCall(
                      this.props.reducer.userProfile.user_id,
                      item.product_id,
                      1
                    );

                    onValueUpdated(item.product_id, item.qty);
                    this.setState(() => ({
                      showIncDec: true
                    }));
                  }}
                  disabled={
                    item.stock_qty === 0 || item.qty === item.stock_qty
                      ? true
                      : false
                  }
                />
              )}
              {this.state.showIncDec && item.qty != item.stock_qty && (
                <IncDec
                  item={item}
                  stock_qty={item.stock_qty}
                  value={item.qty}
                  product_id={item.product_id}
                  onValueUpdated={qtyValue => {
                    if (item.stock_qty == qtyValue) {
                      this.setState({ stockCheck: true, qty: qtyValue });
                    } else {
                      this.setState({ stockCheck: false, qty: qtyValue });
                    }
                    onValueUpdated(item.product_id, qtyValue);
                  }}
                />
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};

export default connect(mapStateToProps)(ListItem);

const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 20,
    elevation: 30,
    padding: 30
  },
  textStyles: {
    fontSize: 17,
    flex: 1,
    color: "black"
  },
  buttonContainer: {
    flex: 0.2,
    margin: 15
  },
  listSubContainer: {
    flexDirection: "column",
    flex: 1.2,
    alignSelf: "center",
    marginLeft: 10
  }
});
