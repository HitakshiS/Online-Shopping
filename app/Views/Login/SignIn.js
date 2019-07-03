import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import axios from "axios";

class SignIn extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Sign In"
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
    console.log("homepage");
    this.props.navigation.navigate("Home");
  }

  SignInPage() {
    this.props.navigation.navigate("SignIn");
  }

  alertBoxCustom = () => {
    Alert.alert(
      "congratulations!! you have Logged In continue shoppings",
      "click on OK to continue shopping",
      [
        {
          text: "Ok",
          onPress: () => HomePage()
        },
        {
          text: "cancel",
          onPress: () => this.SignInPage()
        }
      ],
      { cancelable: true }
    );
  };

  apiSignInCall = () => {
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
          this.props.userProfile({
            name: response.data.profileData.name,
            email: response.data.profileData.email,
            address: response.data.profileData.address,
            mobile: response.data.profileData.mobile
          });
          Alert.alert(
            "congratulations!! you have Logged In continue shoppings",
            "click on OK to continue shopping",
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
        }
        if (response.data.code == 410 || response.data.code == 420) {
          alert("you are not registered please Sign Up");
        }
      })
      .catch(error => {
        // if (error.data.code == 410 || error.data.code == 420) {
        //   alert("you are not registered please Sign Up");
        // }
        console.log(error);
      });
  };

  // componentDidMount() {
  //   this.apiSignInCall();
  // }

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
      this.apiSignInCall();

      return true;
    } else return false;
  };

  render() {
    console.log(this.state.password);
    console.log(this.state.email);
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText style={styles.textStyles} title="Sign In Your Account" />
          <Input
            placeholder="email"
            onChangeText={text => this.handleEmail(text)}
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            secureTextEntry={false}
          />
          <Input
            placeholder="password"
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
            color="#7a42f4"
            onPress={() => this.handleButtonPress()}
            disabled={
              this.state.email.length > 0 && this.state.password.length > 0
                ? false
                : true
            }
          />
        </View>
        <View style={styles.submitButton}>
          <CustomButton
            title="Sign Up"
            color="#7a42f4"
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 0.9
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
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});
