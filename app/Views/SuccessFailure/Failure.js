import React, { Component } from "react";
import { View, Button, StyleSheet, Image } from "react-native";
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
          style={{
            fontSize: 24,
            color: "red",
            flex: 0.3,
            textAlign: "center"
          }}
          title="Sorry Transaction Unsuccessful!! Please Try Again."
        />
        <Image
          style={{
            width: 380,
            height: 300,
            flex: 0.5
          }}
          source={{
            uri: "https://png.pngtree.com/svg/20170706/3d9a32a59e.png"
          }}
          resizeMode="contain"
        />
        <View style={{ flex: 0.4 }}>
          <CustomText
            style={{
              fontSize: 18,
              color: "black",
              textAlign: "center",
              fontWeight: "bold"
            }}
            title="For successful transaction"
          />
          <CustomText
            style={{
              fontSize: 18,
              color: "green",
              textAlign: "center",
              fontWeight: "bold"
            }}
            title="Click on Place Your Order Button in CartList -> Success from the pop-up menu."
          />
        </View>
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
