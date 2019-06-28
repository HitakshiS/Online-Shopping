import React, { Component } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { purchaseList } from "../HomeScreen/action";
import { NavigationActions, StackActions } from "react-navigation";
import { emptyCartList } from "../HomeScreen/action";
import ListItem from "../../Components/ListItem";

class PurchasedList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Purchased List"
  });

  renderItem = ({ item }) => {
    return <ListItem isPurchaseList={true} item={item} />;
  };

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.id === itm.id && item),
      ...itm
    }));

  render() {
    const purchaseData = this.mergeById(
      this.props.reducer.purchaseList,
      this.props.reducer.exampleData
    );
    return (
      <FlatList
        data={purchaseData}
        horizontal={this.props.horizontal}
        renderItem={this.renderItem}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(PurchasedList);
