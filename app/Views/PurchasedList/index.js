import React, { Component } from "react";
import { View, StyleSheet, FlatList, CustomText } from "react-native";
import { connect } from "react-redux";
import ListItem from "../../Components/ListItem";

class PurchasedList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Previous Orders"
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
      <View>
        {purchaseData ? (
          <FlatList
            data={purchaseData}
            horizontal={this.props.horizontal}
            renderItem={this.renderItem}
          />
        ) : (
          <CustomText
            style={{
              fontSize: 20,
              color: "#7a42f4",
              flex: 1,
              textAlign: "center"
            }}
            title="You have not ordered anything yet!!"
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(PurchasedList);
