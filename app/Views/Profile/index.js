import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Radio,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { Constants } from "../../AppConfig/Constants";
import axios from "axios";
import ErrorBoundary from "../../Components/ErrorBoundary";

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
      addresses: [],
      mobile: "",
      showAddAddressInput: false,
      selectedAddress: -1,
      newAddress: ""
    };
  }
  CartPage = () => {
    this.props.navigation.navigate("Cart", {
      addressId: this.state.addresses[this.state.selectedAddress].addressId
    });
  };

  handleName = () => {
    return this.state.userData.name;
  };

  handleEmail = () => {
    this.setState({ email: this.props.userProfile.email });
  };

  // handleDeliveryAddress = () => {
  //   this.setState({ address: this.props.userProfile.address });
  // };

  // handleMobileNumber = () => {
  //   this.setState({ mobile: this.props.userProfile.mobile });
  // };

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

  onFlatListRender = () => {
    console.log("Button clicked");
    this.setState(() => ({
      refreshing: true
    }));
  };

  componentDidMount() {
    axios
      .get(Constants.USER_PROFILE, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        console.log(response.data.profileData);
        if (response.data.code == 200) {
          this.setState(() => ({
            name: response.data.profileData.name,
            email: response.data.profileData.email,
            addresses: response.data.profileData.addresses,
            mobile: response.data.profileData.mobile
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  addAddress = () => {
    this.setState({
      showAddAddressInput: true
    });
  };

  submitNewAddress = () => {
    axios
      .post(Constants.ADD_ADDRESS, {
        user_id: this.props.reducer.userProfile.user_id,
        address: this.state.newAddress
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data.code);
          let tempAddressList = [...this.state.addresses];
          tempAddressList.push({
            address: this.state.newAddress,
            addressId: response.data.address.id
          });
          this.setState({
            addresses: tempAddressList,
            selectedAddress: tempAddressList.length - 1,
            newAddress: "",
            showAddAddressInput: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ selectedAddress: index });
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor:
              this.state.selectedAddress == index ? "#E9967A" : "transparent"
          }}
        >
          <CustomText
            style={[styles.textStyles, { fontSize: 18 }]}
            title={item.address}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  handleButtonPress = () => {
    this.CartPage();
  };

  render() {
    console.log(this.state.addresses);
    return (
      // <ErrorBoundary>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText
            style={[styles.textStyles, { textAlign: "left" }]}
            title="Please fill in the User Details"
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFEFD5",
              marginLeft: 20,
              marginRight: 20
            }}
          >
            <CustomText
              style={[
                styles.textStyles,
                {
                  fontSize: 18,
                  color: "#7a42f4"
                }
              ]}
              title={`Name: ${this.state.name}`}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  fontSize: 18,
                  color: "#7a42f4"
                }
              ]}
              title={`Email: ${this.state.email}`}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  fontSize: 18,
                  color: "#7a42f4",
                  paddingBottom: 20
                }
              ]}
              title={`Mobile Number: ${this.state.mobile}`}
            />
          </View>

          {this.state.addresses && this.state.addresses.length > 0 && (
            <View style={{ flex: 1, padding: 20 }}>
              <CustomText
                title="Please select delivery address"
                style={{ fontSize: 26, color: "black" }}
              />
              <FlatList
                style={{ backgroundColor: "#FFEFD5" }}
                data={this.state.addresses}
                renderItem={this.renderItem}
                extraData={this.state.selectedAddress}
              />
            </View>
          )}
        </View>
        <View style={{ flex: 0.2 }}>
          {this.state.showAddAddressInput && (
            <Input
              placeholder="address"
              value={this.state.newAddress}
              onChangeText={text => {
                this.setState({
                  newAddress: text
                });
              }}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="fullStreetAddress"
            />
          )}

          <CustomButton
            color="#E9967A"
            style={styles.submitButton}
            title={
              this.state.showAddAddressInput
                ? "Submit Address"
                : "Add New Address"
            }
            onPress={
              this.state.showAddAddressInput
                ? this.submitNewAddress
                : this.addAddress
            }
          />

          <CustomButton
            style={styles.submitButton}
            title="Submit Details"
            color="#E9967A"
            onPress={() => {
              this.handleButtonPress();
            }}
            disabled={
              this.state.selectedAddress === -1
                ? true && alert("Select delivery address")
                : false
            }
          />
        </View>
      </ScrollView>
      // </ErrorBoundary>
    );
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
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 0.9
  },
  textStyles: {
    fontSize: 26,
    color: "black",
    textAlign: "left",
    paddingTop: 20,
    paddingLeft: 20
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
