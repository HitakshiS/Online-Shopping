import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import axios from "axios";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class SignIn extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Sign In",
      headerLeft: (
        <View style={{ padding: moderateScale(10) }}>
          <CustomButton
            color="#F4A460"
            title="Back"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  HomePage() {
    this.props.navigation.navigate("Home");
  }

  SignInPage() {
    this.props.navigation.navigate("SignIn");
  }

  apiSignInCall = setItemInStorage => {
    axios({
      method: "post",
      url: "http://192.168.254.223:3000/api/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        if (response.data.code == 200) {
          setItemInStorage(response.data.profileData);
        }
        if (response.data.code == 410) {
          alert("Sorry!! your password does not match.");
        }
        if (response.data.code == 400) {
          alert("You have left the fields empty.");
        }
        if (response.data.code == 420) {
          alert("You are not registered please Sign Up");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  emailValidation() {
    let EmailAdr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mail = this.state.email;
    if (EmailAdr.test(mail) === false) {
      alert("You have entered an invalid email address!");
      return false;
    } else {
      return true;
    }
  }

  handleButtonPress = () => {
    if (this.emailValidation()) {
      this.apiSignInCall(async profileData => {
        await AsyncStorage.setItem("userExist", JSON.stringify(profileData));

        this.props.userProfile({
          ...profileData
        });
        Alert.alert(
          "Congratulations!! You Have Logged In Continue Shoppings",
          "Click On OK To Continue Shopping",
          [
            {
              text: "Ok",
              onPress: () => this.HomePage()
            },
            {
              text: "cancel",
              onPress: () => this.SignInPage()
            }
          ],
          { cancelable: true }
        );
      });

      return true;
    } else return false;
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText style={styles.textStyles} title="Sign In Your Account" />
          <Input
            placeholder="Email"
            onChangeText={text => this.handleEmail(text)}
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            secureTextEntry={false}
          />
          <Input
            placeholder="Password"
            onChangeText={text => this.handlePassword(text)}
            value={this.state.password}
            autoCapitalize="none"
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.submitButton}>
          <CustomButton
            title="Submit Details"
            color="#F4A460"
            onPress={() => this.handleButtonPress()}
            disabled={
              this.state.email.length > 0 && this.state.password.length > 0
                ? false
                : true
            }
          />
        </View>
        <ErrorBoundary>
          <View style={styles.submitButton}>
            <CustomButton
              title="Sign Up"
              color="#F4A460"
              onPress={() => this.props.navigation.navigate("SignUp")}
            />
          </View>
        </ErrorBoundary>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userProfile
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(SignIn);

const styles = ScaledSheet.create({
  container: {
    flex: 0.9
  },
  textStyles: {
    fontSize: "26@ms",
    color: "black",
    textAlign: "center",
    marginTop: "20@ms"
  },
  submitButton: {
    flex: 0.1,
    padding: "10@ms",
    margin: "15@ms",
    height: "40@vs"
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});
