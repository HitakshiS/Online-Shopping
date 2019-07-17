import React, { Component } from "react";
import { AsyncStorage } from "react-native";

export default class Authentication extends Component {
  componentDidMount() {
    this.authenticationAsync();
  }

  authenticationAsync = async () => {
    AsyncStorage.getItem("userExist", false)
      .then((value, err) => {
        if (err) {
          console.log(err);
        } else if (value) {
          // boolean false
          //console.log("userExist=======>", JSON.parse(value));
          this.props.navigation.navigate(
            JSON.parse(value) ? "MyDrawerNavigator" : "AppNavigatorTwo"
          );
        } else {
          this.props.navigation.navigate("AppNavigatorTwo");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return null;
  }
}
