import React, { Component } from "react";
import { Text, View, Button, Image } from "react-native";
import { createStore, applyMiddleware } from "redux";
import HomeScreen from "./app/Views/HomeScreen";
import Profile from "./app/Views/Profile";
import { Provider } from "react-redux";
import HomeReducer from "./app/Views/HomeScreen/HomeReducer";
import RootReducer from "./app/store/RootReducer";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import AppNavigator from "./app/Navigator/AppNavigator";

//const sagaMiddleware = createSagaMiddleware()
const store = createStore(RootReducer, applyMiddleware(logger));
//sagaMiddleware.run(rootSaga);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
