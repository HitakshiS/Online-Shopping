import React, { Component } from "react";
import { Text, View } from "react-native";

function CustomText(props) {
  return <Text style={props.style}>{props.title}</Text>;
}

export default CustomText;
