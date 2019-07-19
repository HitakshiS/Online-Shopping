import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";
import ErrorBoundary from "../../Components/ErrorBoundary";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Quantity: props.item.qty,
      cart: []
    };
  }

  apiCartQuantityCheck = () => {
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
      }); // // let a = this.state.Quantity.splice();
    // // a[index] = qtyValue ? qtyValue : item.qty;
  };

  render() {
    const { item, onRemovePress, onValueUpdated } = this.props;
    amount = item.price * this.state.Quantity;
    //const finalValue = this.mergeById(this.state.cart);
    console.log("stock in cart", item.stock_qty);
    return (
      <View style={styles.containerStyles}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{
              width: 80,
              height: 80
            }}
            source={{
              uri: item.image
            }}
          />
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
                title={`Price: ${item.price}`}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <CustomText
                style={[styles.textStyles, { paddingBottom: 5 }]}
                title={`Amount: ${amount}`}
              />
            </ErrorBoundary>
            <CustomText
              style={[
                styles.textStyles,
                {
                  color: item.qty >= item.stock_qty ? "red" : "green",
                  paddingBottom: 5,
                  fontSize: 20
                }
              ]}
              title={item.qty >= item.stock_qty ? "Out of stock" : "In stock"}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={onRemovePress}
              style={styles.buttonStyles}
              title="x"
              color="#F4A460"
            />
          </View>
        </View>
        <View style={{ flex: 0.2 }}>
          <IncDec
            item={item}
            value={item.qty}
            product_id={item.product_id}
            onValueUpdated={qtyValue => {
              this.setState({
                Quantity: qtyValue
              });
              onValueUpdated(qtyValue);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: "column",
    backgroundColor: "white",
    margin: 20,
    elevation: 30,
    padding: 30
  },
  buttonStyles: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 30
  },
  buttonContainer: {
    flex: 0.3,
    alignSelf: "center"
  },
  textStyles: {
    fontSize: 17,
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
  },
  listSubContainer: {
    flexDirection: "column",
    flex: 1.2,
    alignSelf: "center",
    marginLeft: 10
  }
});
