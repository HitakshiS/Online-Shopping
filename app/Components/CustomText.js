import React, { Component } from "react";
import { Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

function CustomText(props) {
  return <Text {...props}>{props.title}</Text>;
}

export default CustomText;
