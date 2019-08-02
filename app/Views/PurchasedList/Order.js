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
          <View style={{ flexDirection: "row", flex: 1 }}>
            <CustomText
              style={[styles.textStyles, { flex: 0.3, alignItems: "center" }]}
              title={`Order Id: `}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  color: "blue",
                  fontSize: 20,
                  marginLeft: 0,
                  flex: 0.7
                }
              ]}
              title={`${item.id}`}
            />
          </View>

          <CustomText
            style={styles.textStyles}
            title={`Purchase Details: ${first}  ${second}`}
          />

          <CustomText
            style={styles.textStyles}
            title={`Total Distinct Items: ${item.total_items}`}
          />

          <View style={{ flexDirection: "row", flex: 1 }}>
            <CustomText
              style={[styles.textStyles, { flex: 0.25, alignItems: "center" }]}
              title={`Total Bill: `}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  color: "red",
                  fontSize: 20,
                  marginLeft: 0,
                  flex: 0.8
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
      <View style={{ flex: 1, padding: 10, backgroundColor: "#FFEFD5" }}>
        {this.state.order && this.state.order.length > 0 ? (
          <FlatList
            style={{ margin: 10 }}
            data={this.state.order}
            renderItem={this.renderItem}
          />
        ) : (
          <CustomText
            style={{
              fontSize: 20,
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

const styles = StyleSheet.create({
  containerStyles: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0.4,
    backgroundColor: "white",
    elevation: 30,
    paddingTop: 10,
    paddingBottom: 5
  },
  buttonStyles: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 30
  },
  textStyles: {
    fontSize: 17,
    flex: 1,
    color: "black",
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(Order);
