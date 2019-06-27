import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";

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

  handleName = text => {
    this.setState({ name: text });
    console.log(name);
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

  SuccessPage() {
    this.props.navigation.navigate("SuccessFailure");
  }

  render() {
    isEnabled =
      name.length > 0 &&
      mailId.length > 0 &&
      DeliveryAddress.length > 0 &&
      MobileNumber.length > 0;

    return (
      <View style={styles.container}>
        <Input
          placeholder="Name"
          onChangeText={this.handleName}
          value={this.state.name}
        />
        <Input
          placeholder="mailId"
          onChangeText={this.handleMailId}
          value={this.state.mailId}
        />
        <Input
          placeholder="Delivery Address"
          onChangeText={this.handleDeliveryAddress}
          value={this.state.DeliveryAddress}
        />
        <Input
          placeholder="Mobile Number"
          onChangeText={this.handleMobileNumber}
          value={this.state.MobileNumber}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.props.userProfile({
              name: this.state.name,
              mailId: this.state.mailId,
              DeliveryAddress: this.state.DeliveryAddress,
              MobileNumber: this.state.MobileNumber
            })
          }
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <Button
          title="Buy Now"
          onPress={() => {
            Alert.alert(
              "Payment Information",
              "User Profile Updated",
              [
                {
                  text: "Success",
                  onPress: () => this.SuccessPage()
                },
                {
                  text: "Failure",
                  onPress: () => this.SuccessPage()
                }
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
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
