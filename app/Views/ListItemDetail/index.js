import React, { Component } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import { connect } from "react-redux";
import { addToCart } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import { ScrollView } from "react-native-gesture-handler";
import { ApiCartUpdateCall } from "../../Components/ApiCartUpdateCall";
import IncDec from "../../Components/IncDec";
import ErrorBoundary from "../../Components/ErrorBoundary";

class ListItemDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Item Description"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      stockCheck: false
    };
  }
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
    const { onValueUpdated } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFEFD5" }}>
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
            {!this.state.showIncDec && (
              <CustomButton
                title="Add To Cart"
                color="#E9967A"
                onPress={() => {
                  if (itemValue.stock_qty == 1) {
                    this.setState({ stockCheck: true, qty: 1 });
                  } else {
                    this.setState({ stockCheck: false, qty: 1 });
                  }
                  ApiCartUpdateCall(
                    this.props.reducer.userProfile.user_id,
                    itemValue.product_id,
                    1
                  );
                  this.setState(() => ({
                    showIncDec: true
                  }));
                }}
                disabled={itemValue.stock_qty === 0 ? true : false}
              />
            )}
            {this.state.showIncDec && (
              <IncDec
                item={itemValue}
                stock_qty={itemValue.stock_qty}
                value={itemValue.qty}
                product_id={itemValue.product_id}
                onValueUpdated={qtyValue => {
                  if (itemValue.stock_qty == qtyValue) {
                    this.setState({ stockCheck: true, qty: qtyValue });
                  } else {
                    this.setState({ stockCheck: false, qty: qtyValue });
                  }
                  onValueUpdated(itemValue.product_id, qtyValue);
                }}
              />
            )}
          </View>
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
    backgroundColor: "white",
    margin: 20,
    elevation: 30,
    padding: 30,
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
