import React, { Component } from "react";
import { View, ImageBackground, Text, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import CustomText from "./CustomText";
import { connect } from "react-redux";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class DrawerMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require("../Assets/background.jpg")}
            style={{ flex: 1, width: 280, justifyContent: "center" }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Image
                source={{ uri: "https://facebook.github.io/react/logo-og.png" }}
                radius
                style={{
                  width: scale(60),
                  height: verticalScale(60),
                  borderRadius: moderateScale(30),
                  marginLeft: moderateScale(10)
                }}
              />
              <CustomText
                style={styles.headerText}
                title={`Hello ${this.props.reducer.userProfile.name}`}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "HomePage"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "HomePage"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("Home")}
            >
              Home
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "MyOrders"
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "MyOrders"
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen("Order")}
            >
              Your Orders
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};

export default connect(mapStateToProps)(DrawerMenu);

const styles = ScaledSheet.create({
  container: {
    alignItems: "center"
  },
  headerContainer: {
    height: "150@vs"
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontSize: "25@ms",
    fontWeight: "bold",
    marginLeft: "4@ms",
    padding: "8@ms",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  screenContainer: {
    paddingTop: "20@ms",
    width: "100%"
  },
  screenStyle: {
    height: "33@vs",
    marginTop: "2@ms",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  screenTextStyle: {
    fontSize: "20@ms",
    marginLeft: "20@ms",
    textAlign: "center"
  },
  selectedTextStyle: {
    fontWeight: "bold",
    color: "#00adff"
  }
});
