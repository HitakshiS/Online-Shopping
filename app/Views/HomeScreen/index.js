import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, hideCartBtn, exampleData, cop } from "./action";
import ListItem from "../../Components/ListItem";
import PurchasedList from "../PurchasedList/PurchasedList";
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
            title="Orders"
            onPress={() => navigation.toggleDrawer()}
            color="#F4A460"
          />
          <CustomButton
            style={styles.buttonStyles}
            onPress={() => navigation.navigate("Cart")}
            title="Cart"
            color="#F4A460"
          />
        </View>
      )
    };
  };
  constructor() {
    super();
    this.state = {
      data: [],
      cart: []
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
          addToCart;
          this.listDetailNavigation(item, qty);
        }}
      />
    );
  };

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
    axios
      .get(Constants.CART_API, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data.cartData);

          this.setState(
            {
              cart: response.data.cartData
            },
            () => {
              if (
                this.props.reducer.cartList &&
                this.props.reducer.cartList.length === 0
              )
                this.props.cop(this.state.cart);
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.product_id === itm.product_id && item),
      ...itm
    }));

  render() {
    const homeData = this.mergeById(this.state.data, this.state.cart);
    return (
      <ScrollView style={{ backgroundColor: "#FFEFD5" }}>
        {/* <PurchasedList horizontal={true} /> */}
        <FlatList data={homeData} renderItem={this.renderItem} />
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
      exampleData,
      cop
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
