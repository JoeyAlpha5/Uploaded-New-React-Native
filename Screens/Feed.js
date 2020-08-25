import React, {useEffect,useState} from 'react';
import {ActivityIndicator, View, Text, Image, StyleSheet, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
export const Feed = ({navigation}) =>{
    const [feed,setFeed] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://185.237.96.39:3000/users/users?type=getRandomMediaList&&email=chjalome@gmail.com&&length=10')
          .then((response) => response.json())
          .then((json) => setFeed(json.Response))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);

      const navigate = (page) =>{
        navigation.navigate(page);
      }

    return (
        <View style={styles.view}>
            {/* post content goes in here */}
            {isLoading ? <ActivityIndicator style={{color:'#ffffff'}}/> : (
            <FlatList style={{flexDirection:'column',width:'99%'}}
                data={feed}
                keyExtractor={({ id }, index) => index.toFixed()}
                renderItem={({ item }) => (
                
                    <View style={styles.Post}>
                
                {/* // <ImageBackground  imageStyle={{borderRadius:20,width:'100%'}} style={styles.Post} source={{uri:item.post_cover_url}}> */}
                    <View style={styles.TopPostContent}>
                        <View style={styles.ProfileImageSec}>
                            <Image source={{uri: item.artist_thumbnail}} style={{width:50,height:50,borderRadius:50,borderWidth:2,borderColor:'#ffffff'}}/>
                            <Text style={{marginLeft:10,fontSize:15,color:'#ffffff'}}>{item.artist_name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>navigate('Player')} style={{width:'100%'}}>
                        <ImageBackground style={{borderRadius:5,width:'100%',height:200,resizeMode:'cover',justifyContent:'flex-end'}} source={{uri:item.post_cover_url}}>
                            <Text style={styles.postdesc}>{item.post_name}{"\n"}{item.artist_location}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{width:'98%',height:1,backgroundColor:'#000000',marginTop:10}}></View>

                    {/* <View style={styles.BottomPostContent}>
                            <Icons name='heart' size={25} color={'#ffffff'}/>
                            <Icon name='comment-o' size={25} color={'#ffffff'}/>
                            <Icon name='eye' size={25} color={'#ffffff'}/>
                    </View>  */}
                    <View style={styles.BottomPostContent}>
                        <Icons name='heart' size={25} color={'#717171'}/><Text style={{color:'#717171'}}>{item.post_num_likes}</Text>
                        <Icon name='comment-o' size={25} color={'#717171'}  style={{marginLeft:15}}/><Text style={{color:'#717171'}}>{item.post_num_comments}</Text>
                        <Icon name='eye' size={25} color={'#717171'} style={{marginLeft:15}}/><Text style={{color:'#717171'}}>{item.post_num_views}</Text>
                    </View>

                </View>

            )}/>
            )}
        </View>
    )
}

styles = StyleSheet.create({
    postdesc:{
        fontSize:12,
        fontWeight:'bold',
        color:'#ffffff',
        backgroundColor:'#000000',
        width:'auto',
        padding:10,
        marginRight:50,
        marginBottom:30,
        flexDirection:'column-reverse',
        lineHeight:20
    },
    Options:{
        marginTop:20
    },  
    BottomPostContent:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'flex-start',
        padding:10,
        paddingTop:20
    },
    MidpostContent:{
        alignItems:'center',
        flexDirection:'column',
        marginTop:30
    },
    ProfileImageSec:{
        // justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    TopPostContent:{
        justifyContent:'space-between',
        alignItems:'flex-start',
        flexDirection:'row',
        width:'100%',
        marginLeft:20,
        marginBottom:10
    },
    view:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000000'
    },
    Post:{
        height:400,
        width:'100%',
        resizeMode:'cover',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        backgroundColor:'#181818',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:5,
        marginTop:10
    }
});