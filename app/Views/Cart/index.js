import React, { Component } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";
import { connect } from "react-redux";
import { addToCart, reset, emptyCartList } from "../HomeScreen/action";
import { bindActionCreators } from "redux";

class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Cart"
  });

  ProfilePage() {
    this.props.navigation.navigate("Profile");
  }

  SuccessPage() {
    this.props.navigation.navigate("Success");
  }

  FailurePage() {
    this.props.navigation.navigate("Failure");
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
            item={item}
            stock={item.stock}
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
        <View style={{ flex: 1 }}>
          <CustomText
            style={[
              styles.textStyles,
              {
                color: item.qty === item.stock ? "red" : "green",
                paddingBottom: 5
              }
            ]}
            title={item.qty >= item.stock ? "Out of stock" : "In stock"}
          />
        </View>
      </View>
    );
  };

  alertBoxCustom = () => {
    Alert.alert(
      "Payment Information",
      `Congratulation!! ${
        this.props.reducer.userProfile.name
      } now choose Success for successful transaction`,
      [
        {
          text: "Success",
          onPress: () => {
            this.SuccessPage() && this.props.emptyCartList();
          }
        },
        { text: "Failure", onPress: () => this.FailurePage() }
      ],
      { cancelable: true }
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
        {cartData ? (
          <FlatList
            style={{ flex: 0.8 }}
            data={cartData}
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
            title="Your shopping list is empty! Fill in your cart."
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
              onPress={() => {
                Object.getOwnPropertyNames(this.props.reducer.userProfile)
                  .length === 0
                  ? this.ProfilePage()
                  : this.alertBoxCustom();
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyles: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0.4,
    backgroundColor: "#BFEFFF",
    borderWidth: 3,
    borderColor: "black"
  },
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
      reset,
      emptyCartList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
