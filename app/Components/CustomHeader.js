import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Picker,
  Platform,
  SafeAreaView
} from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import axios from "axios";
import { Constants } from "../AppConfig/Constants";
import { randomData, categoryData } from "../Views/HomeScreen/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Dropdown } from "react-native-material-dropdown";

class CustomHeader extends Component {
  constructor() {
    super();
    this.state = {
      products: "All",
      randomData: [],
      categoryData: [],
      iosPlatform: false,
      selectedCategory: 0
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
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.setState({
        iosPlatform: true
      });
    }
  }

  render() {
    const { onDrawerPress, onCartPress } = this.props;
    let categoryValues = this.props.reducer.categoryData.map((item, index) => {
      return {
        value: item.name
      };
    });

    return (
      <View style={styles.containerStyle}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity style={{ flex: 0.1 }} onPress={onDrawerPress}>
            <Image
              style={styles.ImageIconStyle}
              source={{
                uri:
                  "https://lh3.googleusercontent.com/qBiPuYC-H23TGfVPUha1gEeito5PQolF_eJjR74gVnMJiE4FGCFNZDEM85D-Ed7YcJg"
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <CustomText style={styles.titleStyle} title="       Home" />
          <View
            style={{
              flex: 0.2,
              justifyContents: "flex-end",
              alignSelf: "flex-end",
              padding: moderateScale(15)
            }}
          >
            <CustomButton onPress={onCartPress} title="Cart" color="#F4A460" />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <CustomText style={styles.categoryTextStyle} title="Categories:" />
          <View
            style={{
              flex: 1
            }}
          >
            <Dropdown
              onChangeText={(itemValue, itemIndex) => {
                console.log("===>", JSON.stringify(itemValue));
                this.props.onRandomDataUpdate(itemIndex + 1);
                this.setState({
                  products: itemValue,
                  selectedCategory: itemIndex
                });
              }}
              dropdownPosition={0}
              overlayStyle={{ top: 45 }}
              dropdownOffset={{ top: 10, left: 0, bottom: 0 }}
              rippleOpacity={0}
              baseColor={"white"}
              value={this.state.products}
              data={categoryValues}
              itemTextStyle={styles.pickerText}
              pickerStyle={{ width: "100%", flex: 1 }}
              style={[
                styles.pickerText,
                {
                  color:
                    this.state.selectedCategory &&
                    this.state.selectedCategory.length > 0
                      ? "black"
                      : "white"
                }
              ]}
              textColor={
                this.state.selectedCategory &&
                this.state.selectedCategory.length > 0
                  ? "black"
                  : "white"
              }
              itemColor={"black"}
              selectedItemColor={
                this.state.selectedCategory &&
                this.state.selectedCategory.length > 0
                  ? "white"
                  : "black"
              }
              fontSize={moderateScale(12)}
            />
          </View>
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
      categoryData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);

const styles = ScaledSheet.create({
  containerStyle: {
    flex: 0.2,
    backgroundColor: "#F4A460",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    alignSelf: "stretch",
    right: 0,
    left: 0
  },
  titleStyle: {
    flex: 0.82,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "26@ms",
    marginTop: "10@ms",
    color: "white"
  },
  categoryTextStyle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: "20@ms",
    color: "white",
    marginLeft: "10@ms",
    marginTop: "10@ms"
  },
  ImageIconStyle: {
    padding: "10@ms",
    marginLeft: "10@ms",
    marginTop: "10@ms",
    height: "40@vs",
    width: "40@s",
    resizeMode: "stretch"
  },
  input: {
    marginLeft: "10@ms",
    marginRight: "10@ms",
    height: "40@vs",
    borderColor: "white",
    borderWidth: 1,
    width: "390@s",
    color: "white"
  },
  pickerText: {
    fontSize: "12@ms",
    color: "black",
    width: "100%"
  }
});
