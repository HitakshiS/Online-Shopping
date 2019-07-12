import React, { Component } from "react";
import { Alert, BackHandler, View } from "react-native";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  getDerivedStateFromError = error => {
    this.setState({
      hasError: true,
      errorInfo: error
    });
  };

  componentDidCatch = (error, info) => {
    logErrorToMyService(error, info);
  };

  render() {
    return (
      <View>
        {this.state.hasError
          ? alert(
              "An unexpected error has occurred. Please restart to continue."
            )
          : this.props.children}
      </View>
    );
  }
}
