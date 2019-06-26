import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

import IncDec from "./IncDec";

export default (ListItem = props => {
  const { item } = props;
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
            onPress={() => {
              props.onValueUpdated(item.id, 0);
              props.hideCartBtn(item.id);
            }}
          />
        ) : (
          <IncDec
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
  textStyles: {
    fontSize: 16,
    flex: 1,
    color: "black"
  }
});
