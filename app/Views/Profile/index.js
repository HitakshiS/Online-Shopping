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
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mailId: "",
      DeliveryAddress: "",
      MobileNumber: "",
      Alert_Visibility: false
    };
  }
  CartPage = () => {
    this.props.navigation.navigate("Cart");
  };

  handleName = text => {
    this.setState({ name: text });
  };

  handleMailId = text => {
    this.setState({ mailId: text });
  };

  handleDeliveryAddress = text => {
    this.setState({ DeliveryAddress: text });
  };

  handleMobileNumber = text => {
    this.setState({ MobileNumber: text });
  };

  onPress = () => {
    this.props.userProfile({
      name: this.state.name,
      mailId: this.state.mailId,
      DeliveryAddress: this.state.DeliveryAddress,
      MobileNumber: this.state.MobileNumber
    });
    this.CartPage();
    this.ValidateEmail(this.state.mailId);
    this.phoneNumber(this.state.MobileNumber);
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
            onChangeText={text => this.handleName(text)}
            onEndEditing={() => this.mailEditing()}
            value={this.state.name}
            autoCapitalize="characters"
            keyboardType="default"
            textContentType="none"
          />
          <Input
            placeholder="mailId"
            onChangeText={this.handleMailId}
            value={this.state.mailId}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Input
            placeholder="Delivery Address"
            onChangeText={this.handleDeliveryAddress}
            value={this.state.DeliveryAddress}
            autoCapitalize="none"
            keyboardType="default"
            textContentType="fullStreetAddress"
          />
          <Input
            placeholder="Mobile Number"
            onChangeText={this.handleMobileNumber}
            value={this.state.MobileNumber}
            autoCapitalize="none"
            keyboardType="numeric"
            textContentType="none"
          />
        </View>
        <View style={styles.submitButton}>
          <CustomButton
            title="Submit Details"
            color="#7a42f4"
            onPress={() => {
              this.props.userProfile({
                name: this.state.name,
                mailId: this.state.mailId,
                DeliveryAddress: this.state.DeliveryAddress,
                MobileNumber: this.state.MobileNumber
              }) && this.CartPage();
            }}
            disabled={
              this.state.name.length > 0 &&
              this.state.mailId.length > 0 &&
              this.state.DeliveryAddress.length > 0 &&
              this.state.MobileNumber.length > 0
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
