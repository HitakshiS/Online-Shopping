import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Online Shopping"
    };
  };

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomText
          style={[styles.textStyles, { fontSize: 30, color: "#7a42f4" }]}
          title="Welcome"
        />
        <CustomText
          style={styles.textStyles}
          title="Sign In if you are already registered"
        />
        <CustomButton
          title="sign in"
          onPress={() => this.props.navigation.navigate("SignIn")}
          color="#7a42f4"
        />
        <CustomText style={styles.textStyles} title="Sign Up for new user" />
        <CustomButton
          title="sign up"
          onPress={() => this.props.navigation.navigate("SignUp")}
          color="#7a42f4"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    padding: 10,
    margin: 10
  },
  textStyles: {
    fontSize: 26,
    color: "black",
    textAlign: "center"
  },
  submitButton: {
    flex: 0.1,
    padding: 10,
    margin: 15,
    height: 40
  }
});
