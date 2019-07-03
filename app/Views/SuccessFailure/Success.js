import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../Components/CustomButton";
import CustomText from "../../Components/CustomText";
import { NavigationActions, StackActions } from "react-navigation";
import { emptyCartList } from "../HomeScreen/action";

class Success extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Successful Payment"
    // headerLeft: (
    //   <View style={{ padding: 10 }}>
    //     <CustomButton
    //       color="#7a42f4"
    //       title="Back"
    //       onPress={() =>
    //         navigation.dispatch(
    //           StackActions.reset({
    //             index: 0,
    //             actions: [NavigationActions.navigate({ routeName: "Cart" })]
    //           })
    //         )
    //       }
    //     />
    //   </View>
    // )
  });

  homePage() {
    this.props.navigation.navigate("Home");
  }

  componentDidMount() {
    this.props.emptyCartList();
  }

  mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.id === itm.id && item),
      ...itm
    }));

  renderItem = ({ item }) => {
    return (
      <View style={styles.flatlistContainerStyle}>
        <Image style={{ flex: 1 }} source={item.image} />
        <View style={styles.flatlistSubContainerStyle}>
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
    makeId = length => {
      result = "";
      characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    randomNumber = makeId(5);

    const cartData =
      this.props.reducer.purchaseList && this.props.reducer.purchaseList.length
        ? this.mergeById(
            this.props.reducer.purchaseList,
            this.props.reducer.exampleData
          )
        : null;
    return (
      <View style={styles.containerStyle}>
        <View style={{ flex: 0.9 }}>
          {cartData && (
            <CustomText
              style={[styles.textStyle, { color: "green", fontSize: 24 }]}
              title="Congrats!! Your order has been successfully placed."
            />
          )}
          {cartData && (
            <CustomText
              style={[styles.textStyle, { fontSize: 20 }]}
              title={`Your Transaction Id: ${randomNumber}`}
            />
          )}

          {cartData && (
            <FlatList
              style={{ flex: 0.8 }}
              data={cartData}
              renderItem={this.renderItem}
            />
          )}
        </View>
        <View style={{ flex: 0.1 }}>
          {cartData && (
            <CustomButton
              title="Continue Shopping"
              onPress={() => {
                this.homePage();
              }}
              color="#7a42f4"
            />
          )}
        </View>
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
  },
  flatlistContainerStyle: {
    flexDirection: "row",
    backgroundColor: "#BFEFFF",
    margin: 10,
    borderWidth: 3,
    borderColor: "black",
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
