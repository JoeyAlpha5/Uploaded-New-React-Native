import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView ,Dimensions, FlatList, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Player from './Player';
import { useScrollToTop } from '@react-navigation/native';
// import Player from './Player';
const numColumns = 3;
const WIDTH = Dimensions.get('window').width

const SearchComponent  = ({results}) => {

  const Player =(post)=>{
    console.log(post);
  }

  const ref = React.useRef(null);
  useScrollToTop(ref);


  return (
    <>
       
         <FlatList
                keyExtractor={(result) => result.id}
                data = {results}
                ref={ref}
                numColumns={numColumns}
                renderItem={({item})=>{
                 
                     return(
                         <TouchableOpacity style={styles.itemStyle} onPress={() => Player(item)}>
                             <View style={styles.itemStyle}>
                                <Image style={{width:'100%', height:'100%'}} source={{uri:item.cover_url}}/>
                             </View>
                     </TouchableOpacity>
                     )  
                    
                }}
             />
    </>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 40
    },
    itemStyle:{
        // backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height:WIDTH/3,
        width:((WIDTH/3)-2)
    },
    itemInvisible:{
        backgroundColor:'transparent'
    },

      titleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        color: '#f73d0f',
      },
      imageStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff',
      },
      itemstyle: {
        backgroundColor: 'rgba(211, 222, 235, 0.3)',
        borderColor: 'white',
        borderWidth: 1,
        height: 70,
      },
      avatarStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 6,
      },
      textStyle: {
        flexDirection: 'column',
        marginLeft: 10,
      },
});

export default SearchComponent;