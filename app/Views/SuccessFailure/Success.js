import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  BackHandler,
  Alert,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { emptyCartList, logOut } from "../HomeScreen/action";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { NavigationActions, StackActions } from "react-navigation";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { ScrollView } from "react-native-gesture-handler";

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
            title="LogOut"
            onPress={() => {
              const logOutFn = navigation.getParam("logOutFn");

              logOutFn();
            }}
            color="#F4A460"
          />
        </View>
      )
    };
  };

  logOutFn = async () => {
    console.log("=====>");

    Alert.alert(
      null,
      "Are you sure you want to LogOut",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            this.props.logOut();
            await AsyncStorage.removeItem("userExist");
            this.props.navigation.navigate("SignIn");
          }
        }
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

  homePage = () => {
    this.props.navigation.dispatch(StackActions.popToTop());
  };

  logOutFn = async () => {
    console.log("=====>");

    Alert.alert(
      null,
      "Are you sure you want to LogOut",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            this.props.logOut();
            await AsyncStorage.removeItem("userExist");
            this.props.navigation.navigate("SignIn");
          }
        }
      ],
      { cancelable: true }
    );
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={[styles.flatlistContainerStyle, { backgroundColor: "white" }]}
      >
        <Image
          style={{
            width: 100,
            height: 100
          }}
          source={{
            uri: item.image
          }}
        />
        <View style={{ flex: 1, marginLeft: 15, flexDirection: "column" }}>
          <CustomText
            style={styles.textStyles}
            title={`Product: ${item.name}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Price: ${item.price}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Quantity: ${item.qty}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Amount: ${item.price * item.qty}`}
          />
        </View>
      </View>
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

  componentDidMount() {
    this.props.navigation.setParams({ logOutFn: this.logOutFn });
  }

  render() {
    const response = this.props.navigation.getParam("response", "not recieved");
    console.log("success response", response);
    if (
      (response.code === 400 || response.code === 210) &&
      response.notPurchasedItems.length > 0
    ) {
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
            <ScrollView>
              <View>
                <CustomText
                  style={[
                    styles.textStyle,
                    {
                      color: "green",
                      fontSize: 24,
                      paddingLeft: 20,
                      marginBottom: 15,
                      paddingTop: 20
                    }
                  ]}
                  title="Congrats!! Your order has been successfully placed."
                />
                <View
                  style={{ flex: 0.1, flexDirection: "row", paddingLeft: 20 }}
                >
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: 20,
                        color: "black",
                        flex: 0.5
                      }
                    ]}
                    title={`Order Id: `}
                  />
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: 20,
                        color: "blue",
                        fontWeight: "bold",
                        flex: 0.6
                      }
                    ]}
                    title={`${response.order_id}`}
                  />
                </View>
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    paddingLeft: 20,
                    justifyContent: "center"
                  }}
                >
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: 20,
                        color: "black",
                        flex: 0.5
                      }
                    ]}
                    title={`Delivery Address: `}
                  />
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: 20,
                        color: "black",
                        fontWeight: "bold",
                        flex: 0.6
                      }
                    ]}
                    title={`${response.delivery_address}`}
                  />
                </View>
                <View
                  style={{
                    flex: 0.1,
                    flexDirection: "row",
                    paddingLeft: 20,
                    justifyContent: "center"
                  }}
                >
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: 20,
                        color: "black",
                        flex: 0.4
                      }
                    ]}
                    title={`Total Bill: `}
                  />
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: 25,
                        color: "red",
                        fontWeight: "bold",
                        flex: 0.8
                      }
                    ]}
                    title={`₹${response.total_bill}`}
                  />
                </View>
                <FlatList
                  style={{
                    flex: 1,
                    marginTop: 10,
                    marginBottom: 20,
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                  data={response.products}
                  renderItem={this.renderItem}
                />
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.1, paddingLeft: 30, paddingRight: 30 }}>
            <CustomButton
              style={{ marginBottom: 10, paddingBottom: 10 }}
              title="Continue Shopping"
              onPress={() => {
                this.homePage();
              }}
              color="#F4A460"
            />
          </View>
        </View>
      </View>
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
    flexDirection: "row",
    margin: 10,
    elevation: 30,
    padding: 10,
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
