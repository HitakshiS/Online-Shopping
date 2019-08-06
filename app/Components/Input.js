import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

function Profile(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholderTextColor="#F4A460"
        value={props.value}
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}
const styles = ScaledSheet.create({
  container: {
    paddingTop: "23@ms"
  },
  input: {
    margin: "15@ms",
    height: "40@vs",
    borderColor: "#F4A460",
    borderWidth: "1@ms"
  }
});
export default Profile;
