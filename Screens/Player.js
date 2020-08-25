import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
export const Player = ({navigation, route}) =>{
    const data = route.params.data;
    useEffect(() => {
        console.log(route.params.data);
    });
    return (
        <View>
            <Video source={{uri: data.post_source_url }} 
                repeat={true}       
                ignoreSilentSwitch={"obey"}                          
                resizeMode={"cover"}           
                style={{width:width,height:height/2}} />
        </View>
    )
}
