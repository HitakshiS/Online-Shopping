import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image, BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { emptyCartList } from "../HomeScreen/action";
import Axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { NavigationActions, StackActions } from "react-navigation";
import ErrorBoundary from "../../Components/ErrorBoundary";

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Successful Payment",
    headerLeft: (
      <View style={{ padding: 10 }}>
        <CustomButton
          color="#E9967A"
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

  homePage() {
    return this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      })
    );
  }

  renderItem = ({ item }) => {
    return (
      // <ErrorBoundary>
      <View
        style={[styles.flatlistContainerStyle, { backgroundColor: "white" }]}
      >
        <CustomText style={styles.textStyles} title={`Product: ${item.name}`} />
        <CustomText style={styles.textStyles} title={`Price: ${item.price}`} />
        <CustomText style={styles.textStyles} title={`Quantity: ${item.qty}`} />
        <CustomText
          style={styles.textStyles}
          title={`Amount: ${item.price * item.qty}`}
        />
      </View>
      // </ErrorBoundary>
    );
  };

  componentDidMount() {
    this.setState({ cart: this.props.navigation.getParam("cartData") });
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        })
      );
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  makeId = length => {
    result = "";
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  render() {
    randomId = this.makeId(5);
    return (
      // <ErrorBoundary>
      <View style={styles.containerStyle}>
        {this.state.cart && this.state.cart.length > 0 && (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.9 }}>
              <CustomText
                style={[
                  styles.textStyle,
                  { color: "green", fontSize: 24, paddingLeft: 20 }
                ]}
                title="Congrats!! Your order has been successfully placed."
              />
              <CustomText
                style={[
                  styles.textStyle,
                  { fontSize: 20, paddingLeft: 20, color: "black" }
                ]}
                title={`Your Transaction Id: ${randomId}`}
              />
              <FlatList
                style={{ flex: 1, marginBottom: 20 }}
                data={this.state.cart}
                renderItem={this.renderItem}
              />
            </View>

            <View style={{ flex: 0.1 }}>
              <CustomButton
                title="Continue Shopping"
                onPress={() => {
                  this.homePage();
                }}
                color="#E9967A"
              />
            </View>
          </View>
        )}
      </View>
      // </ErrorBoundary>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    // margin: 10,
    // padding: 20,
    flex: 1,
    backgroundColor: "#FFEFD5"
  },
  textStyles: {
    flex: 0.2,
    fontSize: 16,
    flex: 0.5,
    color: "black"
  },
  flatlistContainerStyle: {
    flexDirection: "column",
    margin: 10,
    elevation: 30,
    padding: 20,
    flex: 1
  },
  flatlistSubContainerStyle: {
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
    marginLeft: 10
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
      emptyCartList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Success);
