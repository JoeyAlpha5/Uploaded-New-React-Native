import React from 'react';
import {View, Text} from 'react-native';
const Header = (props) =>{
    return (
        <View style={{width:'100%',height:60,backgroundColor:'#131313',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#ffffff',fontSize:20}}>{props.header}</Text>
        </View>
        
    )
}
export default Header