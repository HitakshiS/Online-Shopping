import React, { Component } from "react";
import { Button, View, StyleSheet, Platform } from "react-native";
import CustomText from "./CustomText";
import { moderateScale } from "react-native-size-matters";

function CustomButton(props) {
  const { style, backgroundColor } = props;

  return (
    <View style={[style, styles.customButton, { backgroundColor }]}>
      <Button {...props} />
    </View>
  );
}

export default CustomButton;
const styles = StyleSheet.create({
  customButton: {
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    //borderColor: "#F4A460",
    backgroundColor: Platform.OS === "ios" ? "white" : "transparent"
  }
});
