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
import Profile from "../Profile";

class Cart extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Cart",
    headerLeft: (
      <View style={{ padding: 10 }}>
        <CustomButton
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
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          flex: 0.4,
          backgroundColor: "#FFDAB9",
          borderWidth: 1,
          borderColor: "black"
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Product: ${item.name}`}
          />
          <View styles={{ paddingRight: 10 }}>
            <CustomButton
              onPress={() => this.props.reset(index)}
              style={styles.buttonStyles}
              title="remove"
              color="#ff0000"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Price: ${item.price * item.qty}`}
          />
          <IncDec
            value={item.qty}
            onValueUpdated={qtyValue => {
              this.props.addToCart(item.id, qtyValue);
            }}
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

  render() {
    const cartData =
      this.props.reducer.cartList && this.props.reducer.cartList.length
        ? this.mergeById(
            this.props.reducer.cartList,
            this.props.reducer.exampleData
          )
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
                { textAlign: "center", backgroundColor: "#E1BEE7" }
              ]}
              title="Total amount"
            />
            <CustomButton
              style={[styles.buttonStyles, { flex: 0.1 }]}
              title="Place Your Order"
              color="#FF8C00"
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
