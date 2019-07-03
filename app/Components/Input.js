import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

function Profile(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholderTextColor="#7a42f4"
        value={props.value}
        autoCorrect={false}
        {...props}
      />
    </View>
  );
  s;
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  }
});
export default Profile;
