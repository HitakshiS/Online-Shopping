import React, { PureComponent } from "react";

import { View, StyleSheet } from "react-native";
import CustomText from "../../Components/CustomText";
import CustomButton from "../../Components/CustomButton";
import IncDec from "../../Components/IncDec";

export default class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Quantity: props.item.qty
    };
  }

  render() {
    const { item, onRemovePress, onValueUpdated } = this.props;
    amount = item.price * this.state.Quantity;
    return (
      <View style={styles.containerStyles}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Product: ${item.name}`}
          />

          <View styles={{ paddingRight: 10 }}>
            <CustomButton
              onPress={onRemovePress}
              style={styles.buttonStyles}
              title="x"
              color="#F4A460"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <CustomText
            style={styles.textStyles}
            title={`Price: ${item.price}`}
          />
          <IncDec
            item={item}
            // stock_qty={this.state.stock_qty}
            value={item.qty}
            product_id={item.product_id}
            onValueUpdated={qtyValue => {
              // // let a = this.state.Quantity.splice();
              // // a[index] = qtyValue ? qtyValue : item.qty;
              this.setState({
                Quantity: qtyValue
              });
              //this.state.Quantity.push(qtyValue);
              onValueUpdated(qtyValue);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText
            style={[styles.textStyles, { paddingBottom: 5 }]}
            title={`Amount: ${amount}`}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomText
            style={[
              styles.textStyles,
              {
                color: item.qty === item.stock_qty ? "red" : "green",
                paddingBottom: 5
              }
            ]}
            title={item.qty >= item.stock_qty ? "Out of stock" : "In stock"}
          />
        </View>
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
    textAlign: "center",
    backgroundColor: "white"
  }
});
