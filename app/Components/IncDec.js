import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { connect } from "react-redux";
import axios from "axios";
import { Constants } from "../AppConfig/Constants";
import { bindActionCreators } from "redux";
import { totalBill } from "../Views/HomeScreen/action";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class IncDec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: props.value ? props.value : 1,
      stock_qty: 0,
      totalBill: 0
    };
  }

  onPress = (isAdd = true) => {
    this.setState(
      {
        counter: isAdd ? this.state.counter + 1 : this.state.counter - 1
      },
      () => {
        this.ApiCartUpdateCall(
          this.props.reducer.userProfile.user_id,
          this.props.product_id,
          isAdd
        );
        this.ApiStockRead(this.props.product_id);
      }
    );
  };

  ApiCartUpdateCall = (user_id, product_id, addSub) => {
    axios
      .post(Constants.CART_UPDATE, { user_id, product_id, addSub })
      .then(response => {
        if (response.data.code == 200) {
          this.setState({
            quantity: response.data.quantity,
            totalBill: response.data.total_bill
          });
          this.props.onValueUpdated(this.state.counter, this.state.totalBill);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  ApiStockRead = product_id => {
    axios
      .get(Constants.STOCK_READ, { params: { product_id } })
      .then(response => {
        if (response.data.code == 200) {
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
    return (
      <View style={styles.containerStyles}>
        <CustomButton
          style={[
            styles.buttonStyles,
            {
              borderColor: this.state.counter > 1 ? "#F4A460" : "grey"
            }
          ]}
          title="-"
          onPress={() => this.onPress(false)}
          disabled={this.state.counter > 1 ? false : true}
          color="#F4A460"
        />
        <View
          style={{
            flex: moderateScale(0.5)
          }}
        >
          <Text style={styles.textStyles}> {this.state.counter} </Text>
        </View>
        <CustomButton
          style={[
            styles.buttonStyles,
            {
              borderColor:
                this.state.counter == this.props.item.stock_qty
                  ? "grey"
                  : "#F4A460"
            }
          ]}
          title="+"
          onPress={() => this.onPress()}
          color="#F4A460"
          disabled={this.state.counter == this.props.item.stock_qty}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      totalBill
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncDec);

const styles = ScaledSheet.create({
  buttonStyles: {
    flex: "1@ms",
    borderRadius: "30@ms"
  },
  textStyles: {
    fontSize: "20@ms",
    paddingRight: "10@ms",
    color: "black",
    paddingLeft: "10@ms",
    textAlign: "center"
  },
  containerStyles: {
    flexDirection: "row",
    flex: "1@ms",
    justifyContent: "flex-end",
    padding: "10@ms"
  }
});
