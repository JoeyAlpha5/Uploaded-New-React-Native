import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
export const Player = ({navigation, route}) =>{
    const data = route.params.data;
    useEffect(() => {
        console.log(route.params.data);
    });
    return (
        <View>
            <Text>Player</Text>
        </View>
    )
}
