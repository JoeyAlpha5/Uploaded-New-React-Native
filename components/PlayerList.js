import React, { useEffect,useState } from 'react';
import {View, Text, Image,FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
const PlayerList = (props)=>{
    const viewPost = (item) =>{
        // console.log(item);
        props.next(item);
        
    }

    const getMore = ()=>{
        console.log("getting more");
        //get last post id in the listArray
        var listArrayLength = props.listArray.length;
        var last_post_id = props.listArray[listArrayLength-1];
        console.log("last post id ", last_post_id.post_id);
        props.loadMore(last_post_id);
    }
    return (
        <FlatList
        // style={{marginTop:20,backgroundColor: '#fff'}}
        ListFooterComponent={<ActivityIndicator size="small" color="#eb8d35"/>}
        data={props.listArray} 
        keyExtractor={({ id }, index) => index.toFixed()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>viewPost(item)}>
                {/* #242424 */}
                <View style={{width:'100%',borderBottomWidth: 1,borderBottomColor:'#242424',marginBottom:10}}>
                    <View style={{width:'80%',marginTop:5,flexDirection:'row'}}>
                        <Image style={{width:40,height:40,borderRadius:50,backgroundColor:'#717171'}} source={{uri: item.artist_thumbnail}}/>
                        <View style={{alignItems:'flex-start',justifyContent:'flex-start',marginBottom:40}}>
                            <Text style={{color:'white',fontSize:9,color:'#717171',marginLeft:10}}>{item.artist_name}</Text>
                            <Text style={{color:'white',fontSize:11,marginLeft:10}}>{item.post_name}</Text>
                        </View>
                    </View>
                    <Image source={{uri:item.post_cover_url}} style={{width:'100%',height:150,borderRadius:10,marginTop:2,marginLeft:0,marginBottom:20}}/>
                </View>
            </TouchableOpacity>
        )} 
        onEndReached={()=>{
            getMore();
        }}
        onEndReachedThreshold={1}
        />
    )
}
export default PlayerList