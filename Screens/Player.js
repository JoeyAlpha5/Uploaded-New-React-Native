import React, { useEffect, useState } from 'react';
import {View, Text, Dimensions} from 'react-native';
import Video from 'react-native-video';
const Player = ({navigation, route}) =>{
    const data = route.params.data;
    const {width, height} = Dimensions.get("screen");
    useEffect(() => {
        console.log(route.params.data);
    });
    return (
        <View>
            <Video source={{uri: data.post_source_url }} 
                repeat={true}       
                ignoreSilentSwitch={"obey"}                          
                resizeMode={"contain"}           
                style={{width:width,height:height/3, backgroundColor:'#000000'}} />
        </View>
    )
}
export  default Player
