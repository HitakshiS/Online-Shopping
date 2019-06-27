import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

import IncDec from "./IncDec";

export default (ListItem = props => {
  const { item } = props;

  return (
    <View style={styles.containerStyles}>
      <Image style={{ flex: 1 }} source={item.image} />
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          alignSelf: "center",
          marginLeft: 10
        }}
      >
        <CustomText style={styles.textStyles} title={`Product: ${item.name}`} />
        <CustomText style={styles.textStyles} title={`Price: ${item.price}`} />
        <CustomText
          style={[styles.textStyles, { color: "green" }]}
          title="In stock"
        />
      </View>
      <View style={{ flex: 1, alignSelf: "center" }}>
        {!item.showIncDec ? (
          <CustomButton
            title="Add To Cart"
            color="#7a42f4"
            onPress={() => {
              props.onValueUpdated(item.id, 0);
              props.hideCartBtn(item.id);
            }}
          />
        ) : (
          <IncDec
            stock={item.stock}
            value={item.qty}
            onValueUpdated={qtyValue => {
              props.onValueUpdated(item.id, qtyValue);
            }}
          />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: "row",
    backgroundColor: "#BFEFFF",
    margin: 10,
    borderWidth: 3,
    borderColor: "black",
    padding: 20
  },
  textStyles: {
    fontSize: 17,
    flex: 1,
    color: "black"
  }
});
