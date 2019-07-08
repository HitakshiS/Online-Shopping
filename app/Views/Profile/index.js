import React, { Component } from "react";
import { View, StyleSheet, ScrollView, FlatList, Radio } from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { Constants } from "../../AppConfig/Constants";
import axios from "axios";

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
      showFlatList: false,
      selectedAddress: -1
    };
  }
  CartPage = () => {
    this.props.navigation.navigate("Cart");
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
      .get(Constants.USER_PROFILE, { params: { user_id: 1 } })
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

  renderItem = ({ item, index }) => {
    return (
      <View>
        <Radio
          style={{ marginRight: 10 }}
          selected={true ? this.setState({ selectedAddress: index }) : null}
        />
        <Input
          placeholder="add another Delivery Address"
          value={item}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="fullStreetAddress"
        />
      </View>
    );
  };

  handleButtonPress = () => {
    this.CartPage();
  };

  addressList = b1 => b1.map(item => item.address);
  render() {
    console.log("flat=====>>", this.state.showFlatList);
    const addressList = this.state.addresses.length
      ? this.addressList(this.state.addresses)
      : null;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomText
            style={styles.textStyles}
            title="Please fill in the User Details"
          />
          <Input
            value={this.state.name}
            autoCapitalize="characters"
            keyboardType="default"
            textContentType="none"
          />
          <Input
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <Input
            value={this.state.mobile}
            autoCapitalize="none"
            keyboardType="numeric"
            textContentType="none"
            maxLength={10}
          />
          <Input
            placeholder="address"
            value={this.state.addresses}
            autoCapitalize="none"
            keyboardType="default"
            textContentType="fullStreetAddress"
          />

          {this.state.showFlatList && (
            <FlatList
              data={addressList}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Radio
                      style={{ marginRight: 10, flex: 0.2 }}
                      selected={
                        true ? this.setState({ selectedAddress: index }) : null
                      }
                    />
                    <Input
                      style={{ flex: 0.5 }}
                      placeholder="add another Delivery Address"
                      onChangeText={text => {
                        let { addressList } = this.state;
                        addressList[index] = text;
                        this.setState({
                          addressList
                        });
                      }}
                      value={this.state.addressList[index]}
                      autoCapitalize="none"
                      keyboardType="default"
                      textContentType="fullStreetAddress"
                    />
                  </View>
                );
              }}
            />
          )}
        </View>
        <View style={{ flex: 0.2 }}>
          <CustomButton
            color="#7a42f4"
            style={styles.submitButton}
            title="add  another address"
            onPress={() =>
              this.setState(() => ({
                showFlatList: true
              }))
            }
          />
          {this.state.showFlatList && (
            <FlatList
              data={this.state.address}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Radio
                      style={{ marginRight: 10 }}
                      selected={
                        true ? this.setState({ selectedAddress: index }) : null
                      }
                    />
                    <Input
                      placeholder="add another Delivery Address"
                      value={item}
                      autoCapitalize="none"
                      keyboardType="default"
                      textContentType="fullStreetAddress"
                    />
                  </View>
                );
              }}
            />
          )}
          {/* <CustomButton
            style={styles.submitButton}
            title="Submit Details"
            color="#7a42f4"
            onPress={() => {
              this.handleButtonPress();
            }}
            // disabled={
            //   this.state.name.length > 0 &&
            //   this.state.email.length > 0 &&
            //   this.state.address.length > 0 &&
            //   this.state.mobile.length > 0
            //     ? false
            //     : true
            // }
          /> */}
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
