import React, { Component } from "react";
import { Button, View, Image, FlatList, StyleSheet } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import Images from "../../AppConfig/Images";
import { connect } from "react-redux";
import { addToCart } from "../HomeScreen/action";
import { bindActionCreators } from "redux";
import { ScrollView } from "react-native-gesture-handler";

class ListItemDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Item Description"
    };
  };
  render() {
    const itemValue = this.props.navigation.getParam("itemValue");
    return (
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "#BFEFFF",
          margin: 10,
          borderWidth: 1,
          borderColor: "black",
          padding: 20,
          flex: 1
        }}
      >
        <Image
          style={{ flex: 0.8, alignSelf: "center" }}
          source={itemValue.image}
        />
        <ScrollView
          style={{
            flexDirection: "column",
            flex: 0.8,
            alignSelf: "center",
            marginLeft: 10
          }}
        >
          <CustomText
            style={styles.textStyles}
            title={`Product: ${itemValue.name}`}
          />
          <CustomText
            style={styles.textStyles}
            title={`Price: ${itemValue.price}`}
          />
          <CustomText
            style={[styles.textStyles, { color: "green" }]}
            title="In stock"
          />
          <CustomText
            style={styles.textStyles}
            title={`Description: ${itemValue.description}`}
          />
        </ScrollView>
        <View
          style={{
            flex: 0.1,
            backgroundColor: "yellow"
          }}
        >
          <CustomButton
            title="Add To Cart"
            onPress={() => this.props.addToCart(itemValue.id, itemValue.qty)}
            color="#FF8C00"
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToCart
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemDetail);

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 16,
    flex: 0.5,
    color: "black"
  }
});
