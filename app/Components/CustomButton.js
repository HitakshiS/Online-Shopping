import React, { Component } from "react";
import { Button, View, StyleSheet } from "react-native";
import CustomText from "./CustomText";

function CustomButton(props) {
  const { style } = props;

  return (
    <View style={[style, { flex: 1 }]}>
      <Button {...props} />
    </View>
  );
}

export default CustomButton;
