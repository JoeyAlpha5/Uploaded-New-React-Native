import React, {useEffect,useState} from 'react';
import {ActivityIndicator, View, Text, Image, AsyncStorage, StyleSheet, ImageBackground, FlatList,StatusBar ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
export const Feed = ({navigation, route}) =>{
    const [feed,setFeed] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const getFeed = async ()=>{
        console.log("getting more videos");
        var savedEmail = await AsyncStorage.getItem("email");
        fetch('http://185.237.96.39:3000/users/users?type=getRandomMediaList&&email='+savedEmail+'&&length=10')
        .then((response) => response.json())
        .then((json) => setFeed([...feed,...json.Response]))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    useEffect(() => {
        //get the feed on load
        getFeed();
      }, []);

    // navigate to view the post
    const navigate = (page, post) =>{
    navigation.navigate(page, {data:post});
    }

    const getPostDuration = (post_duration)=>{
        var int_post_duration = parseInt(post_duration);
        var time_in_minutes = (int_post_duration/60).toFixed(2);
        var minutes = Math.floor(parseFloat(time_in_minutes));
        var seconds = (parseFloat(time_in_minutes) - minutes)*60;
        seconds = Math.floor(seconds);
        return minutes.toString()+":"+seconds.toString();
    }

    return (
        <View style={styles.view}>
            <StatusBar backgroundColor='#000000' barStyle="light-content"/>
            {isLoading ? <ActivityIndicator size="large" color="#eb8d35"/> : (
            <FlatList style={{flexDirection:'column',width:'99%'}}
                data={feed}
                keyExtractor={({ id }, index) => index.toFixed()}
                renderItem={({ item }) => (
                
                    <View style={styles.Post}>
                        <View style={styles.TopPostContent}>
                            <View style={styles.ProfileImageSec}>
                                <Image source={{uri: item.artist_thumbnail}} style={{width:40,height:40,borderRadius:50,borderWidth:2,borderColor:'#ffffff'}}/>
                                <Text style={{marginLeft:10,fontSize:15,color:'#ffffff'}}>{item.artist_name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>navigate('Player',item)} style={{width:'100%'}}>
                            <ImageBackground style={{borderRadius:5,width:'100%',height:280,resizeMode:'cover',justifyContent:'flex-end'}} source={{uri:item.post_cover_url}}>
                                <Text style={styles.postdesc}>{item.post_name}{"\n"}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        {/* <View style={{width:'98%',height:1,backgroundColor:'#000000',marginTop:10}}></View> */}

                        <View style={styles.BottomPostContent}>
                            <View style={styles.postIcons}>
                                <Icons name='heart' size={25} color={'#717171'}/><Text style={{color:'#717171'}}>{item.post_num_likes}</Text>
                                <Icon name='comment-o' size={25} color={'#717171'}  style={{marginLeft:15}}/><Text style={{color:'#717171'}}>{item.post_num_comments}</Text>
                                <Icon name='eye' size={25} color={'#717171'} style={{marginLeft:15}}/><Text style={{color:'#717171'}}>{item.post_num_views}</Text>
                            </View>
                            <Text style={{color:'#717171', marginRight:10}}>
                                {getPostDuration(item.post_duration)}
                            </Text>
                        </View>

                </View>

            )} onEndReached={()=>{
                getFeed();
            }} onEndReachedThreshold ={10}/>
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
        padding:10,
        // marginRight:50,
        width:'80%',
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
        justifyContent:'space-between',
        // padding:10,
        paddingLeft:10,
        paddingTop:10
    },
    postIcons:{
        flexDirection:'row',
        // width:'100%',
        justifyContent:'flex-start',
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
        backgroundColor:'#000000',
        height:'100%'
    },
    Post:{
        height:400,
        width:'100%',
        // resizeMode:'cover',
        // alignItems:'center',
        // justifyContent:'center',
        paddingTop:15,
        shadowColor: "#000",
        backgroundColor:'#181818',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        borderRadius:5,
        marginTop:10
    }
});