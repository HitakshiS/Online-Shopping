import React, {Component} from 'react';
import {Button, View, StyleSheet, Image, FlatList, TouchableHighlight} from 'react-native';
import CustomText from '../../Components/CustomText';
import CustomButton from '../../Components/CustomButton';
import Images from '../../AppConfig/Images';
import IncDec from '../../Components/IncDec';
import { connect } from "react-redux";


class Cart extends Component {

constructor(props) {
    super(props);

    this.state = {
        showComponent: false,
    };
}



    onPress = (showComponent=true) => {
		this.setState({
			showComponent: false,
    	});
	}

	renderItem = ({item}) => {
    	return (
   			<View style = {{marginTop: 10, marginBottom: 10, flex: 0.4, backgroundColor: "#FFFF00", borderWidth: 1, borderColor: "black"}}>
				<View style={{flexDirection: "row", flex: 1}}>
					<CustomText style={styles.textStyles} title={item.name}/>
					<View styles = {{paddingRight: 10}}>
						<CustomButton style = {styles.buttonStyles} onPress={this. } title="remove"/>
					</View>
				</View>
				<View style={{flexDirection: "row", flex: 1}}>
					<CustomText style={styles.textStyles} title={item.price}/>
					<IncDec />
				</View>
			</View>
    	);
 	};

	render() {
		return(
			<View style={{flex: 1}}>
				<FlatList style = {{flex : 0.8}}
					data={this.props.reducer.exampleData}
					renderItem={this.renderItem}/>
					<View style = {{flex : 0.2}}>
						<CustomButton style = {[styles.buttonStyles, {backgroundColor: '#E1BEE7', flex:0.1}]} title = "Total amount"/>
						<CustomButton style = {[styles.buttonStyles, {backgroundColor: '#FF8C00', flex: 0.1}]} title = "Place Your Order"/>
					</View>
			</View>	
		);
	}

}

const exampleData = [
	{
		id: 1,
		name: "Deo",
		price: 100,
		stock: 10,
	},
	{
		id: 2,
		name: "Carrot",
		price: 10,
		stock: 5,
	},
	{
		id: 3,
		name: "Cucumber",
		price: 15,
		stock: 1,
	},
	{
		id: 4,
		name: "Cucumber",
		price: 15,
		stock: 1,
	},
	{
		id: 5,
		name: "Cucumber",
		price: 15,
		stock: 1,
	}
];


const styles = StyleSheet.create({
    buttonStyles: {
	  	color: "#ff0000",
        backgroundColor: 'red',
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
		marginLeft: 10
    }
});

function mapStateToProps(state) {
	return{
		reducer: state.reducer,
	}
}

export default connect(mapStateToProps)(Cart);