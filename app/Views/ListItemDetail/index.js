import React, { Component } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { addToCart } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import { ScrollView } from "react-native-gesture-handler";
import { ApiCartUpdateCall } from "../../Components/ApiCartUpdateCall";

class ListItemDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Item Description"
    };
  };

  HomePage() {
    this.props.navigation.navigate("Home");
  }

  alertBoxCustom = () => {
    Alert.alert(
      "An item is added in your cart.",
      "To make the transaction move to your cart.",
      [
        {
          text: "Ok",
          onPress: () => this.HomePage()
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    const itemValue = this.props.navigation.getParam("itemValue");
    const quantity = this.props.navigation.getParam("quantity");
    return (
      <View style={styles.containerStyle}>
        <Image
          style={{ flex: 0.8, alignSelf: "center" }}
          source={itemValue.image}
        />
        <ScrollView style={styles.scrollViewStyle}>
          <CustomText
            style={styles.textStyles}
            title={`Product: ${itemValue.name}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Price: ${itemValue.price}`}
          />
          <CustomText
            style={[
              styles.textStyles,
              { color: quantity >= itemValue.stock_qty ? "red" : "green" }
            ]}
            title={
              quantity >= itemValue.stock_qty ? "Out of stock" : "In stock"
            }
          />
          <CustomText
            style={styles.textStyles}
            title={`Description: ${itemValue.description}`}
          />
        </ScrollView>
        <View style={{ flex: 0.1 }}>
          <CustomButton
            title="Add To Cart"
            onPress={() => {
              ApiCartUpdateCall(1, itemValue.product_id, 1);
              this.props.addToCart(itemValue.product_id, 1);
              this.alertBoxCustom();
            }}
            color="#FF8C00"
          />
        </View>
      </View>
    );
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
      addToCart
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemDetail);

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    backgroundColor: "#BFEFFF",
    margin: 10,
    borderWidth: 3,
    borderColor: "black",
    padding: 20,
    flex: 1
  },
  textStyles: {
    fontSize: 18,
    flex: 0.5,
    color: "black",
    margin: 10
  },
  scrollViewStyle: {
    flexDirection: "column",
    flex: 0.8,
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 10
  }
});
