import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import Input from "../../Components/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userProfile } from "../HomeScreen/action";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import axios from "axios";
import ErrorBoundary from "../../Components/ErrorBoundary";

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

  apiSignInCall = setItemInStorage => {
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
          setItemInStorage(response.data.profileData);
          console.log("ProfileData=====>>>>>", response.data.profileData);
        }
        if (response.data.code == 410 || response.data.code == 400) {
          alert("you are not registered please Sign Up");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
      this.apiSignInCall(async profileData => {
        await AsyncStorage.setItem("userExist", JSON.stringify(true));

        this.props.userProfile({
          user_id: profileData.user_id,
          name: profileData.name,
          email: profileData.email,
          address: profileData.address,
          mobile: profileData.mobile
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
      });

      return true;
    } else return false;
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <ErrorBoundary> */}
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
          {/* </ErrorBoundary> */}
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
        <ErrorBoundary>
          <View style={styles.submitButton}>
            <CustomButton
              title="Sign Up"
              color="#7a42f4"
              onPress={() => this.props.navigation.navigate("SignUp")}
            />
          </View>
        </ErrorBoundary>
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
