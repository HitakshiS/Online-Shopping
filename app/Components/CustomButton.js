import React, { Component } from "react";
import { Button, View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { moderateScale } from "react-native-size-matters";

function CustomButton(props) {
  const { style } = props;

  return (
    <View style={[style, { flex: moderateScale(1) }]}>
      <Button {...props} />
    </View>
  );
}

export default CustomButton;
