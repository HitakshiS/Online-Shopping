import React, { Component } from "react";
import Success from "../SuccessFailure/Success";
import Failure from "../SuccessFailure/Failure";

function Transaction(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Success />;
  }
  return <Failure />;
}

export default Transaction;
