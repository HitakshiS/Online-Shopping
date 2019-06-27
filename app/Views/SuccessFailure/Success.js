import React, { Component } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { purchaseList } from "../HomeScreen/action";

class Success extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Successful Payment"
    };
  };

  //   makeId = length => {
  //     result = "";
  //     characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     charactersLength = characters.length;
  //     for (let i = 0; i < length; i++) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     return result;
  //   };
  //   randomNumber = makeId(5);

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.id === itm.id && item),
      ...itm
    }));

  renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#BFEFFF",
          margin: 10,
          borderWidth: 3,
          borderColor: "black",
          padding: 20,
          flex: 1
        }}
      >
        <Image style={{ flex: 1 }} source={item.image} />
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignSelf: "center",
            marginLeft: 10
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
            style={[styles.textStyles, { color: "green" }]}
            title={`Quantity: ${item.qty}`}
          />
          <CustomText
            style={[styles.textStyles, { color: "green" }]}
            title={`Amount: ${item.price * item.qty}`}
          />
        </View>
      </View>
    );
  };

  render() {
    const cartData =
      this.props.reducer.cartList && this.props.reducer.cartList.length
        ? this.mergeById(
            this.props.reducer.cartList,
            this.props.reducer.exampleData
          )
        : null;
    return (
      <View style={styles.containerStyle}>
        <CustomText
          style={[styles.textStyle, { color: "green" }]}
          title="Congrats!! Your order has been successfully placed."
        />
        <CustomText
          style={[styles.textStyle, { fontSize: 20 }]}
          title={`Your Transaction Id: 1`}
        />
        <FlatList
          style={{ flex: 0.8 }}
          data={cartData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    flex: 1
  },
  textStyles: {
    flex: 0.2,
    fontSize: 16,
    flex: 0.5,
    color: "black"
  }
});

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}

export default connect(mapStateToProps)(Success);
