import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Platform } from "react-native";
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
      headerForceInset: { top: "never", bottom: "never" },
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
          style={[styles.titleStyle, { fontSize: moderateScale(30) }]}
          title="WELCOME"
        />
        <CustomText style={styles.titleStyle} title="A Store That" />
        <CustomText
          style={[styles.titleStyle, { paddingTop: moderateScale(0) }]}
          title="Never Sleeps"
        />
        <View
          style={{
            flexDirection: "row",
            flex: 0.7,
            alignItems: "flex-end",
            paddingBottom: moderateScale(80)
          }}
        >
          <CustomButton
            style={styles.submitButton}
            title="sign In"
            onPress={() => this.props.navigation.navigate("SignIn")}
            color="white"
            backgroundColor="rgba(100, 100, 100, 0.6)"
          />
          <CustomButton
            style={styles.submitButton}
            title="sign up"
            onPress={() => this.props.navigation.navigate("SignUp")}
            color="white"
            backgroundColor="rgba(100, 100, 100, 0.6)"
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
  titleStyle: {
    fontSize: "26@ms",
    color: "#503E24",
    paddingTop: "50@ms",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    textAlign: "center"
  },
  submitButton: {
    flex: 0.5,
    padding: "0@ms",
    margin: "15@ms",
    borderColor: "rgba(100, 100, 100, 0.9)",
    backgroundColor: "rgba(100, 100, 100, 0.9)",
    borderRadius: "30@ms"
  }
});
