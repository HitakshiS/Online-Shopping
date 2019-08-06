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
import { NavigationActions, StackActions } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class Success extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#F4A460"
      },
      headerTitle: "Successful Payment",
      headerLeft: (
        <View style={{ padding: moderateScale(10) }}>
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
        <View style={{ padding: moderateScale(10) }}>
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

  constructor(props) {
    super(props);
    this.state = {
      success: [],
      order_id: 0,
      delivery_address: "",
      total_bill: 0
    };

    this.backHandler = null;
  }

  componentDidMount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.homePage
    );

    this.props.navigation.setParams({ logOutFn: this.logOutFn });
  }

  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  homePage = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      })
    );
    return true;
  };

  logOutFn = async () => {
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
            width: scale(100),
            height: verticalScale(100),
            flex: moderateScale(1)
          }}
          source={{
            uri: item.image
          }}
          resizeMode="contain"
        />
        <View
          style={{
            flex: moderateScale(1),
            marginLeft: moderateScale(15),
            flexDirection: "column"
          }}
        >
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
        <View style={{ flex: moderateScale(1) }}>
          <View style={{ flex: moderateScale(0.9) }}>
            <ScrollView>
              <View>
                <CustomText
                  style={[
                    styles.textStyle,
                    {
                      color: "green",
                      fontSize: moderateScale(24),
                      paddingLeft: moderateScale(20),
                      marginBottom: moderateScale(10),
                      paddingTop: moderateScale(10)
                    }
                  ]}
                  title="Your Order Is Successfully Placed."
                />
                <View
                  style={{
                    flex: moderateScale(0.1),
                    flexDirection: "row",
                    paddingLeft: moderateScale(20)
                  }}
                >
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: moderateScale(20),
                        color: "black",
                        flex: moderateScale(0.42)
                      }
                    ]}
                    title={`Order Id: `}
                  />
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: moderateScale(20),
                        color: "blue",
                        fontWeight: "bold",
                        flex: moderateScale(0.58)
                      }
                    ]}
                    title={`${response.order_id}`}
                  />
                </View>
                <View
                  style={{
                    flex: moderateScale(0.1),
                    flexDirection: "row",
                    paddingLeft: moderateScale(20),
                    justifyContent: "center"
                  }}
                >
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: moderateScale(20),
                        color: "black",
                        flex: moderateScale(0.42)
                      }
                    ]}
                    title={`Delivery Address: `}
                  />
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: moderateScale(20),
                        color: "black",
                        fontWeight: "bold",
                        flex: moderateScale(0.58)
                      }
                    ]}
                    title={`${response.delivery_address}`}
                  />
                </View>
                <View
                  style={{
                    flex: moderateScale(0.1),
                    flexDirection: "row",
                    paddingLeft: moderateScale(20),
                    justifyContent: "center"
                  }}
                >
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: moderateScale(20),
                        color: "black",
                        flex: moderateScale(0.42)
                      }
                    ]}
                    title={`Total Bill: `}
                  />
                  <CustomText
                    style={[
                      styles.textStyles,
                      {
                        fontSize: moderateScale(20),
                        color: "red",
                        fontWeight: "bold",
                        flex: moderateScale(0.58)
                      }
                    ]}
                    title={`₹${response.total_bill}`}
                  />
                </View>
                <FlatList
                  style={{
                    flex: moderateScale(1),
                    marginTop: moderateScale(10),
                    marginBottom: moderateScale(20),
                    paddingLeft: moderateScale(10),
                    paddingRight: moderateScale(10)
                  }}
                  data={response.products}
                  renderItem={this.renderItem}
                />
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flex: moderateScale(0.1),
              paddingLeft: moderateScale(30),
              paddingRight: moderateScale(30)
            }}
          >
            <CustomButton
              style={{
                marginBottom: moderateScale(10),
                paddingBottom: moderateScale(10)
              }}
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
const styles = ScaledSheet.create({
  containerStyle: {
    flexDirection: "column",
    flex: "1@ms",
    backgroundColor: "#FFEFD5"
  },
  textStyles: {
    flex: "0.2@ms",
    fontSize: "16@ms",
    flex: "0.5@ms",
    color: "black"
  },
  flatlistContainerStyle: {
    flexDirection: "row",
    margin: "10@ms",
    elevation: "30@ms",
    padding: "10@ms",
    flex: "1@ms"
  },
  flatlistSubContainerStyle: {
    flexDirection: "column",
    flex: "1@ms",
    alignSelf: "center",
    marginLeft: "10@ms"
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
