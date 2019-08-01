import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Picker
} from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import axios from "axios";
import { Constants } from "../AppConfig/Constants";
import {
  randomData,
  categoryData,
  existSearch
} from "../Views/HomeScreen/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CustomHeader extends Component {
  constructor() {
    super();
    this.state = {
      products: "",
      randomData: [],
      categoryData: []
    };
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
              //this.props.existSearch(false)
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // componentDidMount() {
  //   axios
  //     .get(Constants.STOCK_API)
  //     .then(response => {
  //       if (response.data.code == 200) {
  //         console.log(response.data.stockData);

  //         this.setState(
  //           {
  //             categoryData: response.data.categoryData
  //           },
  //           () => {
  //             this.props.categoryData(this.state.categoryData);
  //           }
  //         );
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // loadCategoryTypes = () => {
  //   return this.props.reducer.categoryData.map(item => (
  //     <Picker.Item label={item.name} value={item.id} />
  //   ));
  // };

  render() {
    const { onDrawerPress, onCartPress } = this.props;
    let categoryValues = this.props.reducer.categoryData.map(item => (
      <Picker.Item
        style={{ fontSize: 18, fontWeight: "bold" }}
        label={item.name}
        value={item.id}
      />
    ));

    return (
      <View
        style={{
          flex: 0.2,
          backgroundColor: "#F4A460",
          flexDirection: "column",
          position: "absolute",
          top: 0,
          alignSelf: "stretch",
          right: 0,
          left: 0
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity style={{ flex: 0.1 }} onPress={onDrawerPress}>
            <Image
              style={styles.ImageIconStyle}
              source={{
                uri:
                  "https://lh3.googleusercontent.com/qBiPuYC-H23TGfVPUha1gEeito5PQolF_eJjR74gVnMJiE4FGCFNZDEM85D-Ed7YcJg"
              }}
            />
          </TouchableOpacity>
          <CustomText
            style={{
              flex: 0.82,
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 26,
              marginTop: 10,
              color: "white"
            }}
            title="    Home"
          />
          <View
            style={{
              flex: 0.2,
              justifyContents: "flex-end",
              alignSelf: "flex-end",
              padding: 15
            }}
          >
            <CustomButton onPress={onCartPress} title="Cart" color="#F4A460" />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#F4A460"
          }}
        >
          <CustomText
            style={{
              flex: 0.4,
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
              marginTop: 10
            }}
            title="Categories:"
          />
          <Picker
            style={{
              flex: 0.4,
              height: 40,
              width: 150,
              color: "white"
            }}
            selectedValue={this.state.products}
            onValueChange={(itemValue, itemIndex) => {
              this.props.onRandomDataUpdate(itemValue);
              this.setState({ products: itemValue }, () => {});
            }}
            itemStyle={{
              backgroundColor: "grey",
              color: "white",
              fontSize: 17
            }}
          >
            {categoryValues}
          </Picker>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      randomData,
      categoryData,
      existSearch
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);

const styles = StyleSheet.create({
  ImageIconStyle: {
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
    height: 40,
    width: 40,
    resizeMode: "stretch"
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    width: 390,
    color: "white"
  }
});
