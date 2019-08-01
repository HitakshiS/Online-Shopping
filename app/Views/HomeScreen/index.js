import React, { Component } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";

import CustomHeader from "../../Components/CustomHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addToCart,
  hideCartBtn,
  exampleData,
  cop,
  randomData,
  categoryData
} from "./action";
import ListItem from "../../Components/ListItem";
import { Constants } from "../../AppConfig/Constants";
import axios from "axios";

import CustomText from "../../Components/CustomText";

class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      dataFull: [],
      cart: [],
      searchData: [],
      existSearch: false,
      existPicker: 0,
      categoryData: []
    };
  }

  ApiGetStockCall = (category_id = "") => {
    axios
      .get(Constants.STOCK_API, {
        params: { category_id }
      })
      .then(async response => {
        if (response.data.code == 200) {
          const cartResult = await this.getCartDataFromApi();

          if (cartResult && cartResult.data && cartResult.data.code == 200) {
            this.props.exampleData(response.data.stockData);

            this.props.categoryData(response.data.categoryData);

            this.setState(
              {
                data: response.data.stockData,
                dataFull: response.data.stockData,
                cart: cartResult.data.cartData
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
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  listDetailNavigation(item, qty) {
    this.props.navigation.navigate("ListItemDetail", {
      itemValue: item,
      quantity: qty
    });
  }

  searchFilterFunction = text => {
    let newData = [];

    if (text && text != "") {
      newData = this.state.dataFull.filter(item => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.startsWith(textData);
      });
    } else {
      newData = this.state.dataFull;
    }

    this.setState({
      data: newData,
      searchData: newData
    });
  };

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

  static navigationOptions = ({ navigation }) => ({
    header: (
      <CustomHeader
        onDrawerPress={() => {
          navigation.toggleDrawer();
        }}
        onCartPress={() => {
          navigation.navigate("Cart");
        }}
        onRandomDataUpdate={dataValue => {
          const filterFn = navigation.getParam("filterFn");
          filterFn(dataValue);
        }}
      />
    )
  });

  componentDidMount() {
    this.props.navigation.setParams({ filterFn: this.ApiGetStockCall });

    this.ApiGetStockCall();
  }

  getCartDataFromApi = async () => {
    const cartData = await axios.get(Constants.CART_API, {
      params: { user_id: this.props.reducer.userProfile.user_id }
    });

    return cartData;
  };

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.product_id === itm.product_id && item),
      ...itm
    }));

  render() {
    const homeData =
      this.state.data &&
      this.state.data.length > 0 &&
      this.mergeById(this.state.data, this.state.cart);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFEFD5",
          flexDirection: "column",
          marginTop: 100
        }}
      >
        <View
          style={{
            backgroundColor: "#F4A460"
          }}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholderTextColor="white"
            placeholder="Search"
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
          />
        </View>
        <View style={{ marginBottom: 20, flex: 1 }}>
          {this.state.data && this.state.data.length > 0 ? (
            <FlatList
              data={homeData}
              renderItem={this.renderItem}
              keyExtractor={item => item.name}
              extraData={this.state.data}
            />
          ) : (
            <CustomText
              style={styles.emptyTextStyle}
              title="Sorry no such item exists in this stock"
            />
          )}
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
      addToCart,
      hideCartBtn,
      exampleData,
      cop,
      randomData,
      categoryData
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
    backgroundColor: "#F4A460"
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    width: 390,
    color: "white"
  },
  emptyTextStyle: {
    fontSize: 20,
    color: "#7a42f4",
    flex: 1,
    textAlign: "center",
    backgroundColor: "#FFEFD5"
  }
});
