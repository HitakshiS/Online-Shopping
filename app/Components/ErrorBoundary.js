import React, { Component } from "react";
import { Alert, BackHandler, View } from "react-native";
import CustomText from "./CustomText";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError = error => {
    this.setState({
      hasError: true
    });
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({
      errorInfo: error
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "green" }}>
        {this.state.hasError ? (
          <CustomText title="some ERROR is spotted here." />
        ) : (
          this.props.children
        )}
      </View>
    );
  }
}
