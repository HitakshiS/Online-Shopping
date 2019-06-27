import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import Images from "../../AppConfig/Images";
import IncDec from "../../Components/IncDec";
import { connect } from "react-redux";
import { addToCart, reset } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import { NavigationActions, StackActions } from "react-navigation";

class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Cart",
    headerRight: (
      <View style={{ padding: 10 }}>
        <CustomButton
          color="#7a42f4"
          title="Back"
          onPress={() =>
            navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Home" })]
              })
            )
          }
        />
      </View>
    )
  });

  ProfilePage() {
  
    this.props.navigation.navigate("Profile");
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.containerStyles}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Product: ${item.name}`}
          />
          <View styles={{ paddingRight: 10 }}>
            <CustomButton
              onPress={() => this.props.reset(index)}
              style={styles.buttonStyles}
              title="x"
              color="#ff0000"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Price: ${item.price}`}
          />
          <IncDec
            value={item.qty}
            onValueUpdated={qtyValue => {
              this.props.addToCart(item.id, qtyValue);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText
            style={[styles.textStyles, { paddingBottom: 5 }]}
            title={`Amount: ${item.price * item.qty}`}
          />
        </View>
      </View>
    );
  };

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.id === itm.id && item),
      ...itm
    }));

  billingCost = b1 => b1.map(item => item.price * item.qty);

  Amount = c1 =>
    c1.reduce((total, currentValue) => {
      return total + currentValue;
    });

  render() {
    const cartData =
      this.props.reducer.cartList && this.props.reducer.cartList.length
        ? this.mergeById(
            this.props.reducer.cartList,
            this.props.reducer.exampleData
          )
        : null;
    const billing =
      this.props.reducer.cartList && this.props.reducer.cartList.length
        ? this.billingCost(cartData)
        : null;

    const TotalAmount =
      this.props.reducer.cartList && this.props.reducer.cartList.length
        ? this.Amount(billing)
        : null;
    return (
      <View style={{ flex: 1, padding: 10 }}>
        {cartData && (
          <FlatList
            style={{ flex: 0.8 }}
            data={cartData}
            renderItem={this.renderItem}
          />
        )}
        {cartData && (
          <View style={{ flex: 0.2 }}>
            <CustomText
              style={[
                styles.textStyles,
                {
                  textAlign: "center",
                  fontSize: 24,
                  backgroundColor: "#9370DB",
                  marginBottom: 10
                }
              ]}
              title={`Total amount: ${TotalAmount}`}
            />
            <CustomButton
              style={[styles.buttonStyles, { flex: 0.1 }]}
              title="Place Your Order"
              color="#7a42f4"
              onPress={() => this.ProfilePage()}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyles: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 30
  },
  textStyles: {
    fontSize: 20,
    flex: 1,
    color: "black",
    marginLeft: 10,
    marginRight: 10
  },
  containerStyles: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0.4,
    backgroundColor: "#BFEFFF",
    borderWidth: 3,
    borderColor: "black"
  }
});

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToCart,
      reset
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
