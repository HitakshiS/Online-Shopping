import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";

export default class CustomList extends Component {
  renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          flex: 0.4,
          backgroundColor: "#FFFF00",
          borderWidth: 1,
          borderColor: "black"
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText style={styles.textStyles} title={item.name} />
          <View styles={{ paddingRight: 10 }}>
            <CustomButton style={styles.buttonStyles} title={this.onPress} />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText style={styles.textStyles} title={item.price} />
          <IncDec />
        </View>
      </View>
    );
  };
}
