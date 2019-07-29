import React, { Component } from "react";
import { Constants } from "../AppConfig/Constants";
import axios from "axios";

export class ApiGetStockCall extends Component {
  constructor(props){
    super(props)
    this.state = {randomData: []}
  }
  ApiGetStockCall = category_id => {
  axios
    .get(Constants.STOCK_API, {
      params: { category_id }
    })
    .then(response => {
      if (response.data.code == 200) {
        console.log(response.data.stockData);

        this.setState(
          {
            randomData: response.data.stockData
          },
          () => {
            this.props.randomData(this.state.randomData);
          }
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
};
}
