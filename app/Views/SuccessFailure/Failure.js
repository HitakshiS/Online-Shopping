import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "../../Components/CustomText";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomButton from "../../Components/CustomButton";

export default class Failure extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerForceInset: { top: "never", bottom: "never" },
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
            fontSize: moderateScale(24),
            color: "red",
            flex: moderateScale(0.3),
            textAlign: "center"
          }}
          title="Sorry Transaction Unsuccessful!! Please Try Again."
        />
        <Image
          style={{
            width: scale(300),
            height: verticalScale(300),
            flex: 0.4
          }}
          source={{
            uri: "https://png.pngtree.com/svg/20170706/3d9a32a59e.png"
          }}
          resizeMode="contain"
        />
        <View style={{ flex: moderateScale(0.4) }}>
          <CustomText
            style={{
              fontSize: moderateScale(18),
              color: "black",
              textAlign: "center",
              fontWeight: "bold"
            }}
            title="For successful transaction"
          />
          <CustomText
            style={{
              fontSize: moderateScale(18),
              color: "green",
              textAlign: "center",
              fontWeight: "bold"
            }}
            title="Click on Place Your Order Button in CartList -> Success from the pop-up menu."
          />
        </View>
        <CustomButton
          style={{
            margin: moderateScale(10),
            borderRadius: moderateScale(30),
            borderColor: "#F4A460"
          }}
          color="#F4A460"
          title="Try again"
          onPress={() => this.cartNavigation()}
          backgroundColor="white"
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  containerStyles: {
    flex: "1@ms",
    backgroundColor: "#FFEFD5",
    padding: "20@ms",
    justifyContent: "space-between"
  }
});
