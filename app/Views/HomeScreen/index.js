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

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <View style={{ margin: 10, flexDirection: "row" }}>
          <CustomButton
            style={styles.buttonStyles}
            title="drawer"
            onPress={() => navigation.toggleDrawer()}
            color="#7a42f4"
          />
          <CustomButton
            style={styles.buttonStyles}
            onPress={() => navigation.navigate("Cart")}
            title="Cart"
            color="#7a42f4"
          />
        </View>
      )
    };
  };
  constructor() {
    super();
    this.state = {
      data: []
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
        // hideCartBtn={id => {
        //   this.props.hideCartBtn(id);
        // }}
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
          this.props.exampleData({
            id: response.data.stockData.id,
            name: response.data.stockData.name,
            stockQty: response.data.stockData.stockQty,
            price: response.data.stockData.price,
            description: response.data.stockData.description,
            image: response.data.stockData.image
          });
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
      <ScrollView>
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
    margin: 5
  }
});
