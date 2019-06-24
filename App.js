import React, { Component } from "react";
import { Text, View, Button, Image } from "react-native";
import { createStore, applyMiddleware } from "redux";
import HomeScreen from "./app/Views/HomeScreen";
import Cart from "./app/Views/Cart";
import { Provider } from "react-redux";
import reducer from "./app/Views/Cart/reducer";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

//const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(logger));
//sagaMiddleware.run(rootSaga);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  }
}
