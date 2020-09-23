import React, { useEffect,useState } from 'react';
import {View, Text, Image,FlatList,TouchableOpacity} from 'react-native';
const PlayerList = (props)=>{
    const viewPost = (item) =>{
        // console.log(item);
        props.next(item);
        
    }
    return (
        <FlatList
        data={props.listArray} 
        keyExtractor={({ id }, index) => index.toFixed()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>viewPost(item)}>
                <View style={{width:'100%'}}>
                    <View style={{width:'80%',marginTop:20,flexDirection:'row'}}>
                        <Image style={{width:40,height:40,borderRadius:50}} source={{uri: item.artist_thumbnail}}/>
                        <View style={{alignItems:'flex-start',justifyContent:'flex-start',marginBottom:40}}>
                            <Text style={{color:'white',fontSize:9,color:'#717171',marginLeft:10}}>{item.artist_name}</Text>
                            <Text style={{color:'white',fontSize:11,marginLeft:10}}>{item.post_name}</Text>
                            <Image source={{uri:item.post_cover_url}} style={{width:'100%',height:150,borderRadius:10,marginTop:10,marginLeft:10}}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )} 
    />
    )
}
export default PlayerList