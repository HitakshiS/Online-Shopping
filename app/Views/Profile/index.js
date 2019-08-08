import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
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
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerForceInset: { top: "never", bottom: "never" },
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
      selectedAddress: 0,
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

  componentDidMount() {
    axios
      .get(Constants.USER_PROFILE, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
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

  whiteSpaceNewAddress = () => {
    let value = /^\S+$/;
    const newAddress = this.state.newAddress;
    if (value.test(newAddress)) {
      return true;
    } else return false;
  };

  submitNewAddress = () => {
    axios
      .post(Constants.ADD_ADDRESS, {
        user_id: this.props.reducer.userProfile.user_id,
        address: this.state.newAddress
      })
      .then(response => {
        if (response.data.code == 200) {
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
        } else if (response.data.code == 400) {
          alert("You cannot enter empty address field.");
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
              this.state.selectedAddress == index ? "#F4A460" : "transparent",
            borderWidth: moderateScale(1),
            borderColor: "black"
          }}
        >
          <CustomText
            style={[
              styles.textStyles,
              {
                fontSize: moderateScale(18),
                paddingVertical: moderateScale(10)
              }
            ]}
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
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText
            style={[
              styles.textStyles,
              { textAlign: "left", marginBottom: moderateScale(10) }
            ]}
            title="Please Fill In The User Details"
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFEFD5",
              marginLeft: moderateScale(10),
              marginRight: moderateScale(10),
              elevation: moderateScale(20),
              paddingTop: moderateScale(10),
              paddingBottom: moderateScale(10)
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    fontSize: moderateScale(18),
                    color: "black",
                    flex: 0.3,
                    paddingTop: moderateScale(0)
                  }
                ]}
                title={`Name `}
              />
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    fontSize: moderateScale(18),
                    color: "black",
                    fontWeight: "bold",
                    flex: 0.5,
                    paddingTop: moderateScale(0)
                  }
                ]}
                title={` ${this.state.name}`}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    fontSize: moderateScale(18),
                    color: "black",
                    flex: 0.3
                  }
                ]}
                title={`Email `}
              />
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    fontSize: moderateScale(18),
                    color: "black",
                    fontWeight: "bold",
                    flex: 0.5
                  }
                ]}
                title={` ${this.state.email}`}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    fontSize: moderateScale(18),
                    color: "black",
                    flex: 0.3
                  }
                ]}
                title={`Mobile Number `}
              />
              <CustomText
                style={[
                  styles.textStyles,
                  {
                    fontSize: moderateScale(18),
                    color: "black",
                    fontWeight: "bold",
                    flex: 0.5
                  }
                ]}
                title={`${this.state.mobile}`}
              />
            </View>
          </View>

          {this.state.addresses && this.state.addresses.length > 0 && (
            <View style={{ flex: 1, padding: moderateScale(10) }}>
              <CustomText
                title="Please Select Delivery Address"
                style={{
                  fontSize: moderateScale(24),
                  color: "black",
                  marginBottom: moderateScale(10),
                  textAlign: "center"
                }}
              />
              <FlatList
                style={{
                  backgroundColor: "#FFEFD5",
                  elevation: moderateScale(20)
                }}
                data={this.state.addresses}
                renderItem={this.renderItem}
                extraData={this.state.selectedAddress}
              />
            </View>
          )}
        </View>
        <View style={{ flex: 0.2, marginTop: moderateScale(5) }}>
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
            color="#F4A460"
            style={[
              styles.submitButton,
              {
                // marginBottom: moderateScale(5),
                width: scale(170),
                marginLeft: moderateScale(95)
              }
            ]}
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
            disabled={
              this.state.showAddAddressInput &&
              (this.state.newAddress == "" || this.whiteSpaceNewAddress())
                ? true
                : false
            }
          />

          <CustomButton
            style={[styles.submitButton, { paddingTop: moderateScale(0) }]}
            title="Submit Details"
            color="#F4A460"
            onPress={() => {
              this.handleButtonPress();
            }}
            disabled={this.state.selectedAddress === -1 ? true : false}
          />
        </View>
      </ScrollView>
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

const styles = ScaledSheet.create({
  container: {
    flex: 0.9
  },
  textStyles: {
    fontSize: "26@ms",
    color: "black",
    textAlign: "left",
    paddingTop: "20@ms",
    paddingLeft: "20@ms"
  },
  submitButton: {
    flex: 0.1,
    // padding: "10@ms",
    margin: "10@ms",
    height: "30@vs",
    borderRadius: "30@ms"
  },
  submitButtonText: {
    color: "white",
    textAlign: "center"
  }
});
