import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Picker
} from "react-native";
import CustomButton from "../../Components/CustomButton";
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
import Input from "../../Components/Input";
import CustomText from "../../Components/CustomText";

class HomeScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerStyle: {
  //       backgroundColor: "#F4A460"
  //     },
  //     headerTitleStyle: { alignSelf: "center" },
  //     headerTitle: "      Home",
  //     headerLeft: (
  //       <View
  //         style={{ marginRight: 30, paddingRight: 10, flexDirection: "row" }}
  //       >
  //         <CustomButton
  //           style={styles.buttonStyles}
  //           title="Orders"
  //           onPress={() => this.props.navigation.toggleDrawer()}
  //           color="#F4A460"
  //         />
  //       </View>
  //     ),
  //     headerRight: (
  //       <CustomButton
  //         style={styles.buttonStyles}
  //         onPress={() => navigation.navigate("Cart")}
  //         title="Cart"
  //         color="#F4A460"
  //       />
  //       //</View>
  //     )
  //   };
  // };

  constructor() {
    super(); // dataSet.map(item => {
    //   if (item.name === text) {
    //     this.setState({ exist: 1 });
    //     return true;
    //   } else return alert("This item does not exist in the stock.");
    // });
    this.state = {
      data: [],
      dataFull: [],
      cart: [],
      searchData: [],
      existSearch: false,
      existPicker: 0
    };
  }

  ApiGetStockCall = (category_id = 0) => {
    axios
      .get(Constants.STOCK_API, {
        params: { category_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          this.props.exampleData(response.data.stockData);
          console.log(response.data.stockData);
          this.setState(() => ({
            data: response.data.stockData,
            dataFull: response.data.stockData
          }));
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
    // const dataSet = this.props.reducer.randomData.length
    //   ? this.props.reducer.randomData
    //   : this.state.data;

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
      data: newData
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

  // onDrawerPress = () => {
  //   console.log("drawer entered");
  //   this.props.navigation.toggleDrawer();
  // };
  // onCartPress = () => {
  //   this.props.navigation.navigate("Cart");
  // };

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
    this.ApiGetStockCall();

    axios
      .get(Constants.CART_API, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
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

    this.props.navigation.setParams({ filterFn: this.ApiGetStockCall });
  }

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.product_id === itm.product_id && item),
      ...itm
    }));

  render() {
    //this.state.data && this.state.data.length > 0;

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
        <View style={{ marginBottom: 80 }}>
          {homeData.length ? (
            <FlatList
              data={homeData}
              renderItem={this.renderItem}
              keyExtractor={item => item.name}
              extraData={this.state.data}
            />
          ) : (
            <CustomText
              style={[
                styles.emptyTextStyle,
                {
                  flex: 1,
                  backgroundColor: "#FFEFD5",
                  fontSize: 20,
                  color: "#7a42f4",
                  flex: 1,
                  textAlign: "center",
                  backgroundColor: "white"
                }
              ]}
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
    backgroundColor: "white"
  }
});
