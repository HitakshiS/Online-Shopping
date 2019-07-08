import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import axios from "axios";
import { Constants } from "../AppConfig/Constants";
import { ApiCartUpdateCall } from "./ApiCartUpdateCall";

export default class IncDec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: props.value ? props.value : 1
    };
  }

  onPress = (isAdd = true) => {
    this.setState(
      {
        counter: isAdd ? this.state.counter + 1 : this.state.counter - 1
      },
      () => {
        ApiCartUpdateCall(2, this.props.id, isAdd);
        this.props.onValueUpdated(this.state.counter);
      }
    );
  };

  render() {
    return (
      <View style={styles.containerStyles}>
        <CustomButton
          style={styles.buttonStyles}
          title="-"
          onPress={() => this.onPress(false)}
          disabled={this.state.counter > 1 ? false : true}
          color="#7a42f4"
        />
        <Text style={styles.textStyles}> {this.state.counter} </Text>
        <CustomButton
          style={styles.buttonStyles}
          title="+"
          onPress={() => this.onPress()}
          color="#7a42f4"
          disabled={this.state.counter == this.props.stockQty}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyles: {
    flex: 1,
    borderRadius: 30
  },
  textStyles: {
    fontSize: 20,
    marginRight: 10,
    color: "black",
    marginLeft: 10
  },
  containerStyles: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    padding: 10
  }
});
