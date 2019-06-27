import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet
} from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, hideCartBtn } from "./action";
import ListItem from "../../Components/ListItem";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <View style={{ margin: 10 }}>
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
        <FlatList
          data={this.props.reducer.exampleData}
          renderItem={this.renderItem}
        />
      </View>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}

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
