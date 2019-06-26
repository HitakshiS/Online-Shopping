import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../../Components/Input";

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "User Profile"
    };
  };

  ValidateEmail(mail) {
    let EmailAdr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.value.match(EmailAdr)) {
      return true;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  }

  phoneNumber(inputTxt) {
    let phoneNo = /^\d{10}$/;

    if (inputTxt.value.match(phoneNo)) {
      return true;
    } else {
      alert("You have entered an invalid mobile number!");
      return false;
    }
  }

  state = {
    name: "",
    email: "",
    DeliveryAddress: "",
    MobileNumber: ""
  };

  handleName = text => {
    this.setState({ name: text });
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handleDeliveryAddress = text => {
    this.setState({ DeliveryAddress: text });
  };

  handleMobileNumber = text => {
    this.setState({ MobileNumber: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Name"
          onChangeText={this.handleName}
          autoCompleteType="name"
        />
        <Input
          placeholder="Email"
          onChangeText={this.handleEmail}
          autoCompleteType="email"
        />
        <Input
          placeholder="Delivery Address"
          onChangeText={this.handleDeliveryAddress}
          autoCompleteType="street-address"
        />
        <Input
          placeholder="Mobile Number"
          onChangeText={this.handleMobileNumber}
          autoCompleteType="tel"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.mobileNumber)}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});
