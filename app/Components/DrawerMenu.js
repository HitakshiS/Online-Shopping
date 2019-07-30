import React, { Component } from "react";
import { View, ImageBackground, Text, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import CustomText from "./CustomText";
import { connect } from "react-redux";

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
                  width: 60,
                  height: 60,
                  borderRadius: 60 / 2,
                  marginLeft: 10
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  headerContainer: {
    height: 150
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 4,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  screenContainer: {
    paddingTop: 20,
    width: "100%"
  },
  screenStyle: {
    height: 33,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: "center"
  },
  selectedTextStyle: {
    fontWeight: "bold",
    color: "#00adff"
  }
});
