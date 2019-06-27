import React, { Component } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { purchaseList } from "../HomeScreen/action";

export default class Failure extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Payment Failed"
    };
  };

  cartNavigation() {
    this.props.navigation.navigate("Cart");
  }

  render() {
      return(
        <View style={{flex: 1, backgroundColor: "#BFEFFF", padding:20}}>
        <CustomText style={{fontSize: 30, fontColor: "black"}} title="Sorry your transaction has been unsuccessful!! Please try again."/>
        <Button style={{margin:20}} color="#7a42f4" title="Try again" onPress={() => this.cartNavigation()}/>
        </View>
      );
  }
}