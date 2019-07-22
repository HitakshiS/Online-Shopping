import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import ListItem from "../../Components/ListItem";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import ErrorBoundary from "../../Components/ErrorBoundary";

class PurchasedList extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#F4A460"
    },
    title: "Purchased Items"
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <ListItem isPurchaseList={true} item={item} />
      </View>
    );
  };

  render() {
    const itemValue = this.props.navigation.getParam("itemValue");
    const total_bill = this.props.navigation.getParam("total_bill");
    const id = this.props.navigation.getParam("id");
    const delivery_address = this.props.navigation.getParam("delivery_address");

    return (
      // <ErrorBoundary>
      <View style={styles.containerStyle}>
        {itemValue && itemValue.length > 0 ? (
          <View style={{ flex: 1 }}>
            <CustomText style={styles.textStyles} title={`Order Id: ${id}`} />
            <FlatList
              style={{ flex: 0.8, marginBottom: 10, marginTop: 10 }}
              data={itemValue}
              horizontal={this.props.horizontal}
              renderItem={this.renderItem}
            />
            {/* <View style={{ flex: 0.2, backgroundColor: "blue" }}> */}
            <CustomText
              style={styles.textStyles}
              title={`Total Bill: ₹${total_bill}`}
            />
            <CustomText
              style={styles.textStyles}
              title={`Delivery Address: ${delivery_address}`}
            />
            {/* </View> */}
          </View>
        ) : (
          !this.props.horizontal && (
            <CustomText
              style={{
                fontSize: 20,
                color: "#7a42f4",
                textAlign: "center"
              }}
              title="You have not purchased anything yet!!"
            />
          )
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    // margin: 10,
    padding: 20,
    flex: 1,
    backgroundColor: "#FFEFD5"
  },
  textStyles: {
    fontSize: 20,
    flex: 0.1,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "#F4A460"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(PurchasedList);
