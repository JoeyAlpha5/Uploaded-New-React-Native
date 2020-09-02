import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
const Loader = (props) =>{
    if(props.loader == true){
        console.log(props.loader);
        return (
                <ActivityIndicator size="large" color="#eb8d35" style={{position:'absolute',zIndex: 1,}}/>     
        )
    }else{
        return null; 
    }

}
export default Loader