import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, hideCartBtn } from "./action";
import ListItem from "../../Components/ListItem";
import PurchasedList from "../PurchasedList";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <View style={{ margin: 10, flexDirection: "row" }}>
          <CustomButton
            title="drawer"
            onPress={() => navigation.openDrawer()}
            color="#7a42f4"
          />
          <CustomButton
            onPress={() => navigation.navigate("Cart")}
            title="Cart"
            color="#7a42f4"
          />
        </View>
      )
    };
  };

  listDetailNavigation(item) {
    this.props.navigation.navigate("ListItemDetail", {
      itemValue: item
    });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.listDetailNavigation(item)}>
        <ListItem
          item={item}
          hideCartBtn={id => {
            this.props.hideCartBtn(id);
          }}
          onValueUpdated={(id, qty) => {
            this.props.addToCart(id, qty);
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return this.props.reducer && this.props.reducer.exampleData ? (
      <View>
        <PurchasedList horizontal={true} />
        <FlatList
          data={this.props.reducer.exampleData}
          renderItem={this.renderItem}
        />
      </View>
    ) : null;
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
      hideCartBtn
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
