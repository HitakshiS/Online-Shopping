import React, { Component } from "react";
import { Alert, BackHandler, View } from "react-native";
import CustomText from "./CustomText";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorInfo: error
    });
    logErrorToMyService(error, info);
  };

  render() {
    return (
      <View>
        {this.state.hasError ? (
          <CustomText title="some ERROR is spotted here." />
        ) : (
          this.props.children
        )}
      </View>
    );
  }
}
