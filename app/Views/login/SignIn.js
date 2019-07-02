import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";

export default class SignIn extends Component {
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
    console.log(name);
  };

  handlePassword = text => {
    this.setState({ password: text });
  };
  render() {
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
            // onPress={() =>
            //   this.props.signIn({
            //     email: this.state.email,
            //     password: this.state.password
            //   })
            // }
            disabled={
              this.state.email.length > 0 && this.state.password.length > 0
                ? false
                : true
            }
          />
        </View>
        <CustomButton
          title="Sign Up"
          color="#7a42f4"
          onPress={() => this.props.navigation.navigate("SignUp")}
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
