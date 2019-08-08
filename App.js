import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./app/store/RootReducer";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import AppNavigator from "./app/Navigator/AppNavigator";
import { Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";

//const sagaMiddleware = createSagaMiddleware()
const store = createStore(RootReducer, applyMiddleware(logger));
//sagaMiddleware.run(rootSaga);
export default class App extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    super();
  }

  render() {
    console.ignoredYellowBox = ["Warning:"];
    return (
      <Provider store={store}>
        <StatusBar barStyle={"light-content"} />
        {Platform.OS === "ios" ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F4A460" }}>
            <AppNavigator />
          </SafeAreaView>
        ) : (
          <AppNavigator />
        )}
      </Provider>
    );
  }
}
