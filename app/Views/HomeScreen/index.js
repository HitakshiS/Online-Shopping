import React, { Component } from "react";
import { Button, View, StyleSheet, Image, FlatList } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import Images from "../../AppConfig/Images";
import { connect } from "react-redux";

class HomeScreen extends Component {
  renderItem = ({ item }) => {
    console.log("item.image", item.image);
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#BFEFFF",
          margin: 10,
          borderWidth: 1,
          borderColor: "black",
          padding: 20
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
          <CustomText title={item.name} />
          <CustomText title="price" />
          <CustomText title="In stock" />
        </View>
        <View style={{ flex: 1, alignSelf: "center", paddingRight: 10 }}>
          <CustomButton title="Add To Cart" />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.props.reducer.exampleData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.HomeReducer
  };
}

export default connect(mapStateToProps)(HomeScreen);
