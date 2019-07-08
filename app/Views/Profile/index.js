import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "User Profile"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      mobile: "",
      textInput: [],
      Alert_Visibility: false
    };
  }
  CartPage = () => {
    this.props.navigation.navigate("Cart");
  };

  handleName = () => {
    this.setState({ name: this.props.userProfile.name });
  };

  handleEmail = () => {
    this.setState({ email: this.props.userProfile.email });
  };

  handleDeliveryAddress = () => {
    this.setState({ address: this.props.userProfile.address });
  };

  handleMobileNumber = () => {
    this.setState({ mobile: this.props.userProfile.mobile });
  };

  emailValidation() {
    let EmailAdr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = this.state.email;
    if (EmailAdr.test(email) === false) {
      alert("You have entered an invalid email address!");
      return false;
    } else {
      return true;
    }
  }
  phoneNumberValidation() {
    let phoneNo = /^\d{10}$/;
    const mobile = this.state.MobileNumber;
    if (phoneNo.test(mobile) === false) {
      alert("You have entered an invalid mobile number!");
      return false;
    } else {
      return true;
    }
  }

  addTextInput = key => {
    let textInput = this.state.textInput;
    textInput.push(
      <Input
        placeholder="Delivery Address"
        onChangeText={() => this.handleDeliveryAddress()}
        value={this.state.address}
        autoCapitalize="none"
        keyboardType="default"
        textContentType="fullStreetAddress"
        editable={false}
      />
    );
    this.setState({ textInput });
  };

  handleButtonPress = () => {
    if (this.emailValidation() && this.phoneNumberValidation()) {
      this.props.userProfile({
        name: this.state.name,
        mailId: this.state.email,
        address: this.state.address,
        mobile: this.state.mobile
      });
      this.CartPage();
      return true;
    } else return false;
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText
            style={styles.textStyles}
            title="Please fill in the User Details"
          />
          <Input
            placeholder="Name"
            onChangeText={() => this.handleName()}
            value={this.state.name}
            autoCapitalize="characters"
            keyboardType="default"
            textContentType="none"
            editable={false}
          />
          <Input
            placeholder="email"
            onChangeText={() => this.handleEmail()}
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={false}
          />
          <Input
            placeholder="Delivery Address"
            onChangeText={() => this.handleDeliveryAddress()}
            value={this.state.address}
            autoCapitalize="none"
            keyboardType="default"
            textContentType="fullStreetAddress"
            editable={false}
          />
          <Input
            placeholder="Mobile Number"
            onChangeText={() => this.handleMobileNumber()}
            value={this.state.mobile}
            autoCapitalize="none"
            keyboardType="numeric"
            textContentType="none"
            maxLength={10}
            editable={false}
          />
        </View>
        <View style={styles.submitButton}>
          <CustomButton
            title="add  another address"
            onPress={() => this.addTextInput(this.state.textInput.length)}
          />
          {this.state.textInput.map((value, index) => {
            return value;
          })}
          <CustomButton
            title="Submit Details"
            color="#7a42f4"
            onPress={() => {
              this.handleButtonPress();
            }}
            disabled={
              this.state.name.length > 0 &&
              this.state.email.length > 0 &&
              this.state.address.length > 0 &&
              this.state.mobile.length > 0
                ? false
                : true
            }
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
)(Profile);

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
