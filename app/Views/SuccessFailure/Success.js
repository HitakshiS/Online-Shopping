import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image, BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { emptyCartList, logOut } from "../HomeScreen/action";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { NavigationActions, StackActions } from "react-navigation";
import ErrorBoundary from "../../Components/ErrorBoundary";

class Success extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Successful Payment",
      headerLeft: (
        <View style={{ padding: 10 }}>
          <CustomButton
            color="#F4A460"
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
      ),
      headerRight: (
        <View style={{ padding: 10 }}>
          <CustomButton
            color="#F4A460"
            title="LogOut"
            onPress={() => this.logOut()}
          />
        </View>
      )
    };
  };

  logOut = () => {
    Alert.alert(
      "Are you sure you want to LogOut",
      [
        {
          text: "Ok",
          onPress: () => {
            this.props.logOut();
          }
        },
        { text: "Cancel" }
      ],
      { cancelable: true }
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      success: [],
      order_id: 0,
      delivery_address: "",
      total_bill: 0
    };
  }

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

  // ApiSuccessfulPaymentAll = (user_id, address_id) => {
  //   axios
  //     .post(Constants.SUCCESSFUL_PAYMENT_ALL, { user_id, address_id })
  //     .then(response => {
  //       console.log(response.data);
  //       if (response.data.code == 200) {
  //         console.log(response.data);
  //         this.setState({
  //           success: response.data.products,
  //           order_id: response.data.order_id,
  //           delivery_address: response.data.delivery_address,
  //           total_bill: response.data.total_bill
  //         });
  //       }
  //       if (response.data.notPurchasedItems.length > 0) {
  //         response.data.notPurchasedItems.map(item =>
  //           alert(
  //             `This items are OUT OF STOCK therefore cannot be purchased ${item}`
  //           )
  //         );
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // componentDidMount() {
  //   this.ApiSuccessfulPaymentAll(
  //     this.props.reducer.userProfile.user_id,
  //     this.props.navigation.getParam("addressId")
  //   );
  //   this.setState({ cart: this.props.navigation.getParam("cartData") });
  // BackHandler.addEventListener("hardwareBackPress", () => {
  //   this.props.navigation.dispatch(
  //     NavigationActions.reset({
  //       index: 0,
  //       actions: [NavigationActions.navigate({ routeName: "Home" })]
  //     })
  //   );
  // });
  //}

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress");
  // }

  render() {
    const response = this.props.navigation.getParam("response", "not recieved");
    console.log("success response", response);
    if (response.notPurchasedItems.length > 0) {
      response.notPurchasedItems.map(item =>
        alert(
          `This items are OUT OF STOCK therefore cannot be purchased ${item}`
        )
      );
    }

    return (
      <View style={styles.containerStyle}>
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
              title={`Your Transaction Id: ${response.order_id}`}
            />
            <CustomText
              style={[
                styles.textStyle,
                { fontSize: 20, paddingLeft: 20, color: "black" }
              ]}
              title={`Delivery Address: ${response.delivery_address}`}
            />
            <FlatList
              style={{ flex: 1, marginBottom: 20 }}
              data={response.products}
              renderItem={this.renderItem}
            />
          </View>

          <View style={{ flex: 0.1 }}>
            <CustomText
              style={[
                styles.textStyle,
                {
                  fontSize: 20,
                  paddingLeft: 20,
                  color: "black",
                  textAlign: "center"
                }
              ]}
              title={`Total Bill: ₹${response.total_bill}`}
            />
            <CustomButton
              style={{ flex: 0.1, paddingBottom: 10 }}
              title="Continue Shopping"
              onPress={() => {
                this.homePage();
              }}
              color="#F4A460"
            />
          </View>
        </View>
        {/* )} */}
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
      emptyCartList,
      logOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Success);
