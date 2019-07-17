import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import CustomText from "../../Components/CustomText";

export default class Failure extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Payment Failed"
    };
  };

  cartNavigation() {
    this.props.navigation.navigate("Cart");
  }

  render() {
    return (
      <View style={styles.containerStyles}>
        <CustomText
          style={{ fontSize: 30, color: "red" }}
          title="Sorry your transaction has been unsuccessful!! Please try again."
        />
        <CustomText
          style={{ fontSize: 18, color: "green" }}
          title="For successful transaction click on Place Your Order Button in Cart list and choose success from the pop-up menu."
        />
        <Button
          style={{ margin: 20 }}
          color="#F4A460"
          title="Try again"
          onPress={() => this.cartNavigation()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: "#FFEFD5",
    padding: 20,
    justifyContent: "space-between"
  }
});
