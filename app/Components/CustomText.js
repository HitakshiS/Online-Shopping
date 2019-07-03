import React, { Component } from "react";
import { Text, View } from "react-native";

function CustomText(props) {
  return <Text {...props}>{props.title}</Text>;
}

export default CustomText;
