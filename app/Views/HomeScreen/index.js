import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, hideCartBtn } from "./action";
import ListItem from "../../Components/ListItem";
import PurchasedList from "../PurchasedList";
import { ScrollView } from "react-native-gesture-handler";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Home",
      headerRight: (
        <View style={{ margin: 10, flexDirection: "row" }}>
          <CustomButton
            style={styles.buttonStyles}
            title="drawer"
            onPress={() => navigation.openDrawer()}
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
        hideCartBtn={id => {
          this.props.hideCartBtn(id);
        }}
        onValueUpdated={(id, qty) => {
          this.props.addToCart(id, qty);
        }}
        listDetailNavigation={(item, qty) => {
          this.listDetailNavigation(item, qty);
        }}
      />
    );
  };

  render() {
    return this.props.reducer && this.props.reducer.exampleData ? (
      <ScrollView>
        <PurchasedList horizontal={true} />
        <FlatList
          data={this.props.reducer.exampleData}
          renderItem={this.renderItem}
        />
      </ScrollView>
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

const styles = StyleSheet.create({
  buttonStyles: {
    flex: 1,
    borderRadius: 30,
    margin: 5
  }
});
