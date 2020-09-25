import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView ,Dimensions, FlatList, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Player from './Player';
import { useScrollToTop } from '@react-navigation/native';
const numColumns = 1;
const WIDTH = Dimensions.get('window').width

const Searched  = ({results}) => {
  const Player = (post)=>{
    console.log(post);
  }

  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <>
        <FlatList
            ref={ref}  
            data = {results}
            keyExtractor={(result) => result.cover_url}
            numColumns={numColumns}
            renderItem={({item})=>{
                 return(
                     <TouchableOpacity
                     onPress={() => Player(item)}
                   >
                     <View style={styles.itemstyle}>
                        <View style={{ flexDirection: 'row' }}>
                              <Image source={{uri:item.cover_url}} style={styles.avatarStyle} />
                              <View style={styles.textStyle}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    // fontWeight: 'bold',
                                    color: '#fff',
                                    marginTop: 20,
                                  }}
                                >
                                  {item.description}
                                </Text>
                            </View>
                        </View>
                     </View>
                   </TouchableOpacity>
                 )
            }}/>
    </>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 40
    },
    itemStyle:{
        // backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // margin: 1,
        // height:WIDTH,
        width:WIDTH
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
        backgroundColor: '#181818',
        // borderColor: 'white',
        // borderWidth: 1,
        // height: 70,
        padding:5
      },
      avatarStyle: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginTop: 6,
      },
      textStyle: {
        flexDirection: 'column',
        marginLeft: 10,
        width:'80%'
      },
});

export default Searched;