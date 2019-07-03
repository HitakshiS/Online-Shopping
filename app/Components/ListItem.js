import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

import IncDec from "./IncDec";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockCheck: false,
      qty: 0
    };
  }

  render() {
    const {
      item,
      isPurchaseList,
      onValueUpdated,
      hideCartBtn,
      listDetailNavigation
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          listDetailNavigation && listDetailNavigation(item, this.state.qty)
        }
      >
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
            <CustomText
              style={styles.textStyles}
              title={`Product: ${item.name}`}
            />
            <CustomText
              style={styles.textStyles}
              title={`Quantity: ${item.qty ? item.qty : this.state.qty}`}
            />
            <CustomText
              style={styles.textStyles}
              title={`Price: ${item.price}`}
            />
            <CustomText
              style={[
                styles.textStyles,
                {
                  color:
                    item.stock === 0 || this.state.stockCheck ? "red" : "green"
                }
              ]}
              title={
                item.stock === 0 || this.state.stockCheck
                  ? "Out of stock"
                  : "In stock"
              }
            />
          </View>
          {!isPurchaseList && (
            <View style={{ flex: 1, alignSelf: "center" }}>
              {!item.showIncDec ? (
                <CustomButton
                  title="Add To Cart"
                  color="#7a42f4"
                  onPress={() => {
                    if (item.stock == 1) {
                      this.setState({ stockCheck: true, qty: 1 });
                    } else {
                      this.setState({ stockCheck: false, qty: 1 });
                    }
                    onValueUpdated(item.id, 1);
                    hideCartBtn(item.id);
                  }}
                  disabled={item.stock === 0 ? true : false}
                />
              ) : (
                <IncDec
                  item={item}
                  stock={item.stock}
                  value={item.qty}
                  onValueUpdated={qtyValue => {
                    if (item.stock == qtyValue) {
                      this.setState({ stockCheck: true, qty: qtyValue });
                    } else {
                      this.setState({ stockCheck: false, qty: qtyValue });
                    }
                    onValueUpdated(item.id, qtyValue);
                  }}
                />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

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
