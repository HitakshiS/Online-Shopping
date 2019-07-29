import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import ErrorBoundary from "../../Components/ErrorBoundary";

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
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
          style={[styles.textStyles, { fontSize: 40, color: "#F4A460" }]}
          title="Welcome"
        />
        <CustomText
          style={[styles.textStyles, { marginTop: 40 }]}
          title="Sign In if you are already registered"
        />
        <CustomButton
          title="sign in"
          onPress={() => this.props.navigation.navigate("SignIn")}
          color="#F4A460"
        />
        <CustomText style={styles.textStyles} title="Sign Up for new user" />
        <CustomButton
          title="sign up"
          onPress={() => this.props.navigation.navigate("SignUp")}
          color="#F4A460"
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
    fontSize: 24,
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
