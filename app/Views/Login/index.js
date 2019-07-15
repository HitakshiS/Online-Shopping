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
          style={[styles.textStyles, { fontSize: 30, color: "#E9967A" }]}
          title="Welcome"
        />
        <ErrorBoundary>
          <CustomText
            style={styles.textStyles}
            title="Sign In if you are already registered"
          />
        </ErrorBoundary>
        <CustomButton
          title="sign in"
          onPress={() => this.props.navigation.navigate("SignIn")}
          color="#E9967A"
        />
        <CustomText style={styles.textStyles} title="Sign Up for new user" />
        <CustomButton
          title="sign up"
          onPress={() => this.props.navigation.navigate("SignUp")}
          color="#E9967A"
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
