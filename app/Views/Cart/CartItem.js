import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Quantity: props.item.qty,
      cart: [],
      quant: 0
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
      });
  };

  render() {
    const { item, onRemovePress, onValueUpdated } = this.props;
    amount = item.price * this.state.Quantity;
    return (
      <View style={styles.containerStyles}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{
              width: scale(80),
              height: verticalScale(130),
              flex: 1
            }}
            source={{
              uri: item.image
            }}
            resizeMode="contain"
          />
          <View style={styles.listSubContainer}>
            <ErrorBoundary>
              <CustomText
                style={[
                  styles.textStyles,
                  { fontWeight: "bold", fontSize: moderateScale(18) }
                ]}
                title={`${item.name}`}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <CustomText style={styles.textStyles} title={`₹${item.price}`} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    paddingBottom: moderateScale(5),
                    fontSize: moderateScale(20)
                  }
                ]}
                title={`Total: ₹${amount}`}
              />
            </ErrorBoundary>
            <CustomText
              style={[
                styles.textStyles,
                {
                  color:
                    this.state.Quantity >= item.stock_qty ? "red" : "green",
                  paddingBottom: moderateScale(5),
                  fontSize: moderateScale(20)
                }
              ]}
              title={
                this.state.Quantity >= item.stock_qty
                  ? "Out of stock"
                  : "In stock"
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={onRemovePress}
              style={styles.buttonStyles}
              title="x"
              color="red"
            />
            <Image
              style={{
                width: scale(30),
                height: verticalScale(30),
                paddingTop: moderateScale(130)
              }}
              source={{
                uri:
                  "https://pngimage.net/wp-content/uploads/2018/06/veg-sign-png-5.png"
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{ flex: 0.2 }}>
          <IncDec
            item={item}
            value={item.qty}
            product_id={item.product_id}
            onValueUpdated={(qtyValue, totalBill) => {
              this.setState({
                Quantity: qtyValue
              });
              onValueUpdated(qtyValue, totalBill);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  containerStyles: {
    flexDirection: "column",
    backgroundColor: "white",
    margin: "10@ms",
    elevation: "30@ms",
    padding: "10@ms"
  },
  buttonStyles: {
    flex: 0.05,
    borderRadius: "30@ms",
    backgroundColor: "red"
  },
  buttonContainer: {
    flex: 0.4,
    alignSelf: "center",
  },
  textStyles: {
    fontSize: "17@ms",
    flex: 1,
    color: "black",
    marginLeft: "10@ms",
    marginRight: "10@ms"
  },
  emptyTextStyle: {
    fontSize: "20@ms",
    color: "#7a42f4",
    flex: 1,
    textAlign: "center",
    backgroundColor: "white"
  },
  listSubContainer: {
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
    paddingLeft: "10@ms"
  }
});
