import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { userProfile } from "./../HomeScreen/action";
import { bindActionCreators } from "redux";
// import axios from "axios";
// import { Constants } from "../../AppConfig/Constants";

class Authentication extends Component {
  componentDidMount() {
    this.authenticationAsync();
  }

  authenticationAsync = async () => {
    AsyncStorage.getItem("userExist", false)
      .then((value, err) => {
        if (err) {
          console.log(err);
        } else if (value) {
          this.props.userProfile({
            ...JSON.parse(value)
          });
          //});

          // boolean false
          console.log("userExist=======>", JSON.parse(value));
          this.props.navigation.navigate(
            JSON.parse(value) ? "MyDrawerNavigator" : "AppNavigatorTwo"
          );
        } else {
          console.log("userExist=======>", JSON.parse(value));
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

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userProfile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
