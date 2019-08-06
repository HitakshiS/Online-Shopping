import React, { Component } from "react";
import { Button, View, StyleSheet, Platform } from "react-native";
import CustomText from "./CustomText";

function CustomButton(props) {
  const { style } = props;

  return (
    <View style={[style,styles.customButton]}>
      <Button {...props} />
    </View>
  );
}

export default CustomButton;
const styles = StyleSheet.create({
  customButton: {
    borderWidth: 1,
    borderColor: "#F4A460"
  }
})
