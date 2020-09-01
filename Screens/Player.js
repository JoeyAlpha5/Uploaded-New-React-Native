import React, { useEffect, useState } from 'react';
import {View, Text, Dimensions, StatusBar,StyleSheet, TextInput} from 'react-native';
import Video from 'react-native-video';
const Player = ({navigation, route}) =>{
    const data = route.params.data;
    const {width, height} = Dimensions.get("screen");
    useEffect(() => {
        console.log(route.params.data);
    });
    return (
        <View style={{width:width, flex: 1,justifyContent:'space-between'}}>
            <StatusBar backgroundColor='#000000' barStyle="light-content"/>
            <View>
                <Video source={{uri: data.post_source_url }} 
                    repeat={true}       
                    ignoreSilentSwitch={"obey"}                          
                    resizeMode={"contain"}           
                    style={{width:width,height:height/3, backgroundColor:'#000000'}} />
                <View style={styles.commentsBar}>
                    <Text style={styles.commentsHeader}>Comments: {data.post_num_comments}</Text>
                </View>
            </View>

            <View style={styles.commentsInput}>
                <TextInput style={{width:'100%', height:40,paddingLeft:15,}} placeholder={"Add comment.."}/>
            </View>
        </View>
    )
}
export  default Player
const styles = StyleSheet.create({
    commentsInput:{
        width:'100%',
    },
    commentsHeader:{
        marginLeft:15
    },
    commentsBar:{
        width:'100%',
        height:50,
        justifyContent:'center',
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,

    }
})
