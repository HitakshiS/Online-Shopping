import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, hideCartBtn, exampleData } from "./action";
import ListItem from "../../Components/ListItem";
import PurchasedList from "../PurchasedList";
import { ScrollView } from "react-native-gesture-handler";
import { Constants } from "../../AppConfig/Constants";
import axios from "axios";
import ErrorBoundary from "../../Components/ErrorBoundary";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Home",
      headerRight: (
        <View style={{ margin: 10, flexDirection: "row" }}>
          <CustomButton
            style={styles.buttonStyles}
            title="drawer"
            onPress={() => navigation.toggleDrawer()}
            color="#E9967A"
          />
          <CustomButton
            style={styles.buttonStyles}
            onPress={() => navigation.navigate("Cart")}
            title="Cart"
            color="#E9967A"
          />
        </View>
      )
    };
  };
  constructor() {
    super();
    this.state = {
      data: []
      //cart: []
    };
  }

  listDetailNavigation(item, qty) {
    this.props.navigation.navigate("ListItemDetail", {
      itemValue: item,
      quantity: qty
    });
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        stock_qty={item.stock_qty}
        onValueUpdated={(id, qty) => {
          this.props.addToCart(id, qty);
        }}
        listDetailNavigation={(item, qty) => {
          this.listDetailNavigation(item, qty);
        }}
      />
    );
  };

  // apiHomeDataCall = () => {
  //   axios({
  //     method: "post",
  //     url: Constants.STOCK_API
  //   })
  //     .then(response => {
  //       if (response.data.code == 200) {
  //         console.log(response.data.stockData);
  //         // const data = response.stockData;
  //         this.setState(() => ({
  //           data: response.data.stockData
  //         }));
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  componentDidMount() {
    axios
      .get(Constants.STOCK_API)
      .then(response => {
        if (response.data.code == 200) {
          this.props.exampleData(
            response.data.stockData.id,
            response.data.stockData.name,
            response.data.stockData.stockQty,
            response.data.stockData.price,
            response.data.stockData.description,
            response.data.stockData.image
          );
          console.log(response.data.stockData);
          this.setState(() => ({
            data: response.data.stockData
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#FFEFD5" }}>
        <PurchasedList horizontal={true} />
        <FlatList data={this.state.data} renderItem={this.renderItem} />
      </ScrollView>
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
      addToCart,
      hideCartBtn,
      exampleData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  buttonStyles: {
    flex: 1,
    borderRadius: 30,
    margin: 5,
    backgroundColor: "#7a42f4"
  }
});
