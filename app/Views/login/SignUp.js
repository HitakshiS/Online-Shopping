import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import axios from "axios";

export default class SignUp extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Sign Up"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleName = text => {
    this.setState({ name: text });
  };

  handleEmail = text => {
    this.setState({ email: text });
    console.log(name);
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  apiSignInCall = () => {
    axios({
      method: "post",
      url: "http://192.168.254.223:3000/api/register",
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.password
      }
    })
      .then(function(response) {
        if (response.data.code == 200) {
          console.log(response);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.apiSignInCall();
  }

  passwordValidation = () => {
    password = this.state.password;
    confirmPassword = this.state.confirmPassword;
    if (password.localeCompare(confirmPassword)) return true;
    else {
      alert("password and confirm password do not match.");
      return false;
    }
  };

  render() {
    console.log(this.state.password);
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText
            style={styles.textStyles}
            title="Fill in the following user details"
          />
          <Input
            placeholder="name"
            onChangeText={text => this.handleName(text)}
            value={this.state.name}
            autoCapitalize="characters"
            keyboardType="default"
            textContentType="username"
            secureTextEntry={false}
          />
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
          <Input
            placeholder="confirm password"
            onChangeText={text => this.handleConfirmPassword(text)}
            value={this.state.confirmPassword}
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
            onPress={() => this.apiSignInCall()}
            disabled={
              this.state.name.length > 0 &&
              this.state.email.length > 0 &&
              this.state.password.length > 0 &&
              this.state.confirmPassword.length > 0
                ? false
                : true
            }
          />
        </View>
        <CustomButton
          title="home"
          color="#7a42f4"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </ScrollView>
    );
  }
}
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
