import React, { Component, Fragment } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import ListItem from "../../Components/ListItem";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { ScrollView } from "react-native-gesture-handler";

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
      <View style={styles.containerStyle}>
        {itemValue && itemValue.length > 0 ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.7 }}>
              <FlatList
                style={{ marginBottom: 10, marginTop: 10 }}
                data={itemValue}
                horizontal={this.props.horizontal}
                renderItem={this.renderItem}
              />
            </View>
            <View
              style={{
                flex: 0.3,
                backgroundColor: "white",
                elevation: 30,
                padding: 16
              }}
            >
              <CustomText style={styles.textStyles} title={`Order Id: ${id}`} />
              <CustomText
                style={styles.textStyles}
                title={`Total Bill: ₹${total_bill}`}
              />
              <CustomText
                style={[styles.textStyles, { textAlign: "left" }]}
                title={`Delivery Address: ${delivery_address}`}
              />
            </View>
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
    padding: 10,
    flex: 1,
    backgroundColor: "#FFEFD5"
  },
  textStyles: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    textAlign: "left",
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(PurchasedList);
