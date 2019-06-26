import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

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
        this.props.onValueUpdated(this.state.counter);
      }
    );
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
          padding: 10
        }}
      >
        <CustomButton
          style={styles.buttonStyles}
          title="-"
          onPress={() => this.onPress(false)}
          disabled={this.state.counter > 0 ? false : true}
        />
        <Text
          style={{
            fontSize: 20,
            marginRight: 10,
            color: "black",
            marginLeft: 10
          }}
        >
          {" "}
          {this.state.counter}{" "}
        </Text>
        <CustomButton
          style={styles.buttonStyles}
          title="+"
          onPress={this.onPress}
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
    flex: 1,
    color: "black",
    marginLeft: 10
  }
});
