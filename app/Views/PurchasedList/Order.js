import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import CustomText from "../../Components/CustomText";
import ErrorBoundary from "../../Components/ErrorBoundary";
import axios from "axios";
import { Constants } from "../../AppConfig/Constants";

class Order extends Component {
  static navigationOptions = {
    title: "Previous orders"
  };

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => PurchasedListNavigation(item, bill)}
      >
        <View style={{ flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Purchase Details: ${item.creation_time_stamp}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Total Bill: ${item.total_bill}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Total Distinct Items: ${item.total_items}`}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      order: ""
    };
  }

  PurchasedListNavigation(item, bill) {
    this.props.navigation.navigate("PurchasedList", {
      itemValue: item.products,
      bill: this.state.order.total_bill
    });
  }

  componentDidMount = () => {
    axios
      .get(Constants.GET_ORDER, {
        params: { user_id: this.props.reducer.userProfile.user_id }
      })
      .then(response => {
        if (response.data.code == 200) {
          console.log(response.data);
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
          <FlatList data={this.state.order} renderItem={this.renderItem} />
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
    elevation: 30
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
  },
  emptyTextStyle: {
    fontSize: 20,
    color: "#7a42f4",
    flex: 1,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.HomeReducer
  };
};
export default connect(mapStateToProps)(Order);
