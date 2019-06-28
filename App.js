import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import Profile from "./app/Views/Profile";
import { Provider } from "react-redux";
import Failure from "./app/Views/SuccessFailure/Failure";
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
