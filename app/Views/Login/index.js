import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

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
      <ImageBackground
        source={require("../../Assets/background.jpg")}
        style={[styles.container, { width: "100%", height: "100%" }]}
      >
        <CustomText
          style={[
            styles.textStyles,
            {
              fontSize: moderateScale(40),
              color: "#503E24",
              fontFamily: "serif",
              fontWeight: "bold"
            }
          ]}
          title="Welcome"
        />
        <CustomText
          style={[
            styles.textStyles,
            {
              fontSize: moderateScale(30),
              color: "#503E24",
              paddingTop: moderateScale(50),
              fontFamily: "serif"
            }
          ]}
          title="A STORE THAT"
        />
        <CustomText
          style={[
            styles.textStyles,
            {
              fontSize: moderateScale(30),
              color: "#503E24",
              fontFamily: "serif"
            }
          ]}
          title="NEVER SLEEPS"
        />
        <View
          style={{ flexDirection: "row", flex: 0.7, alignItems: "flex-end" }}
        >
          <CustomButton
            style={styles.submitButton}
            title="sign In"
            onPress={() => this.props.navigation.navigate("SignIn")}
            color="rgba(100, 100, 100, 0.9)"
          />
          <CustomButton
            style={styles.submitButton}
            title="sign up"
            onPress={() => this.props.navigation.navigate("SignUp")}
            color="rgba(100, 100, 100, 0.9)"
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  textStyles: {
    fontSize: "24@ms",
    color: "black",
    textAlign: "center"
  },
  submitButton: {
    flex: 0.5,
    padding: "10@ms",
    margin: "15@ms",
    height: "30%"
  }
});
