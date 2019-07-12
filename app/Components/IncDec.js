import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { ApiCartUpdateCall } from "./ApiCartUpdateCall";
import { connect } from "react-redux";

class IncDec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: props.value ? props.value : 1
    };
  }

  onPress = (isAdd = true) => {
    this.setState(
      {
        counter: isAdd ? this.state.counter + 1 : this.state.counter - 1
      },
      () => {
        ApiCartUpdateCall(
          this.props.reducer.userProfile.user_id,
          this.props.product_id,
          isAdd
        );
        // ApiGetCart(this.props.reducer.userProfile.user_id);
        this.props.onValueUpdated(this.state.counter);
      }
    );
  };

  // ApiGetCart = user_id => {
  //   axios
  //     .get(Constants.CART_API, {
  //       params: { user_id: this.props.reducer.userProfile.user_id }
  //     })
  //     .then(response => {
  //       if (response.data.code == 200) {
  //         console.log(response.data.cartData);

  //         this.setState(() => ({
  //           cart: response.data.cartData
  //         }));
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    return (
      <View style={styles.containerStyles}>
        <CustomButton
          style={styles.buttonStyles}
          title="-"
          onPress={() => this.onPress(false)}
          disabled={this.state.counter > 1 ? false : true}
          color="#E9967A"
        />
        <Text style={styles.textStyles}> {this.state.counter} </Text>
        <CustomButton
          style={styles.buttonStyles}
          title="+"
          onPress={() => this.onPress()}
          color="#E9967A"
          disabled={this.state.counter == this.props.stock_qty}
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

export default connect(mapStateToProps)(IncDec);

const styles = StyleSheet.create({
  buttonStyles: {
    flex: 1,
    borderRadius: 30
  },
  textStyles: {
    fontSize: 20,
    marginRight: 10,
    color: "black",
    marginLeft: 10
  },
  containerStyles: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    padding: 10
  }
});
