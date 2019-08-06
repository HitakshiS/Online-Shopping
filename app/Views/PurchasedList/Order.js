import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import CustomText from "../../Components/CustomText";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";
import { ScaledSheet } from "react-native-size-matters";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

class Order extends Component {
  _didFocusSubscription;
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#F4A460"
    },
    headerTitle: "Previous orders"
  });

  constructor(props) {
    super(props);
    this.state = {
      order: ""
    };

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload => this.getOrdersList()
    );
  }

  renderItem = ({ item }) => {
    const str = item.creation_time_stamp;
    const first = str.slice(0, 10);
    const second = str.slice(11, 16);
    return (
      <TouchableWithoutFeedback
        onPress={() => this.PurchasedListNavigation(item, item.total_bill)}
      >
        <View style={styles.containerStyles}>
          <View style={{ flexDirection: "row", flex: moderateScale(1) }}>
            <CustomText
              style={[
                styles.textStyles,
                { flex: moderateScale(0.3), alignItems: "center" }
              ]}
              title={`Order Id: `}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  color: "blue",
                  fontSize: moderateScale(20),
                  marginLeft: moderateScale(0),
                  flex: moderateScale(0.7)
                }
              ]}
              title={`${item.id}`}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <CustomText
              style={[
                styles.textStyles,
                { flex: moderateScale(0.3), alignItems: "center" }
              ]}
              title={`Order Time: `}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  fontSize: moderateScale(20),
                  marginLeft: moderateScale(0),
                  flex: moderateScale(0.7)
                }
              ]}
              title={`${first}  ${second}`}
            />
          </View>
          <View style={{ flexDirection: "row", flex: moderateScale(1) }}>
            <CustomText
              style={[
                styles.textStyles,
                { flex: moderateScale(0.3), alignItems: "center" }
              ]}
              title={`Total Items: `}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  fontSize: moderateScale(20),
                  marginLeft: moderateScale(0),
                  flex: moderateScale(0.7)
                }
              ]}
              title={`${item.total_items}`}
            />
          </View>

          <View style={{ flexDirection: "row", flex: moderateScale(1) }}>
            <CustomText
              style={[
                styles.textStyles,
                { flex: moderateScale(0.3), alignItems: "center" }
              ]}
              title={`Total Bill: `}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  color: "red",
                  fontSize: moderateScale(20),
                  marginLeft: moderateScale(0),
                  flex: moderateScale(0.7)
                }
              ]}
              title={`${item.total_bill}`}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  PurchasedListNavigation = item => {
    this.props.navigation.navigate("PurchasedList", {
      itemValue: item.products,
      total_bill: item.total_bill,
      id: item.id,
      delivery_address: item.delivery_address
    });
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
  }

  getOrdersList = () => {
    axios
      .get(Constants.GET_ORDER, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data.ordersData);

          this.setState(() => ({
            order: response.data.ordersData
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View
        style={{
          flex: moderateScale(1),
          padding: moderateScale(10),
          backgroundColor: "#FFEFD5"
        }}
      >
        {this.state.order && this.state.order.length > 0 ? (
          <FlatList
            style={{ margin: moderateScale(10) }}
            data={this.state.order}
            renderItem={this.renderItem}
          />
        ) : (
          <CustomText
            style={{
              fontSize: moderateScale(20),
              color: "#7a42f4",
              textAlign: "center"
            }}
            title="You have not ordered anything yet!!"
          />
        )}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  containerStyles: {
    marginTop: "10@ms",
    marginBottom: "10@ms",
    flex: "0.4@ms",
    backgroundColor: "white",
    elevation: "30@ms",
    paddingTop: "10@ms",
    paddingBottom: "5@ms"
  },
  buttonStyles: {
    flex: "1@ms",
    marginRight: "10@ms",
    marginLeft: "10@ms",
    marginTop: "5@ms",
    borderRadius: "30@ms"
  },
  textStyles: {
    fontSize: "17@ms",
    flex: "1@ms",
    color: "black",
    marginLeft: "10@ms",
    marginRight: "10@ms",
    paddingBottom: "10@ms",
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(Order);
