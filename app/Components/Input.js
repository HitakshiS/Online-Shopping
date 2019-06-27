import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function Profile(props) {
  return (
    <View style={styles.container}>
      <TextInput
        type="submit"
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#7a42f4"
        autoCapitalize="none"
        onChangeText={props.onChangeText}
        value={this.value}
        autoCorrect={false}
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
