import React, {useEffect,useState} from 'react';
import {ActivityIndicator, View, Text, Image,StyleSheet, ImageBackground, FlatList,StatusBar ,TouchableOpacity, RefreshControl, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Icono from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import { set } from 'react-native-reanimated';
export const Feed = ({navigation, route}) =>{
    const [feed,setFeed] = useState([]);
    const [count,setCount] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [Err,setErr] = useState(false);
    const [Refreshing,setRefreshing] = useState(false);
    const getFeed = async ()=>{
        console.log("getting more videos, count is ", count);
        var savedEmail = await AsyncStorage.getItem("email");
        fetch('http://185.237.96.39:3000/users/users?type=getHomeList2&&email='+savedEmail+'&&count='+count)
        .then((response) => response.json())
        .then((json) =>{ setFeed([...feed,...json.Response]); setErr(false);setRefreshing(false)})
        .catch((error) => {
            console.error(error);
            if(feed.length != 0){
                Alert.alert("Unable to load new posts, please check your internet connection.");
                setRefreshing(false);
            }else{
                setErr(true);
            }   
        })
        .finally(() =>{ setLoading(false); setCount(count+11);setRefreshing(false) });
    }
    useEffect(() => {
        //get the feed on load
        SplashScreen.hide();
        getFeed();
      }, []);

    // navigate to view the post
    const navigate = (page, post) =>{
        navigation.navigate(page, {data:post});
    }
    //
    const onRefresh = ()=>{
        setRefreshing(true);
        setCount(0);
        // setFeed([]);
        getFeed();
    }

    const onReload=()=>{
        setErr(false);
        setLoading(true);
        setCount(0);
        // setFeed([]);
        getFeed();
    }
    const getPostDuration = (post_duration)=>{
        var int_post_duration = parseInt(post_duration);
        var time_in_minutes = (int_post_duration/60).toFixed(2);
        var minutes = Math.floor(parseFloat(time_in_minutes));
        var seconds = (parseFloat(time_in_minutes) - minutes)*60;
        seconds = Math.floor(seconds);
        return minutes.toString()+":"+seconds.toString();
    }
    
    const getDate = (date) => {
        var today = new Date();
        var other_date = new Date(date);
        var date_difference = new Date(today.getTime()-other_date.getTime());
        var minutes = date_difference.getMinutes();
        var hours =  date_difference.getHours();
        var _date = date_difference.getDate();
        var month = date_difference.getMonth();
        var year = date_difference.getFullYear()-1970;
        if(year > 0){
          if(year == 1){
            return (1+ " year ago");
          }else{
            return (year + " years ago");
          }
        }else if(month > 0 ){
          if(month == 1){
            return (1+ " month ago");
          }else{
            return (month+ " months ago");
          }
        }else if(_date > 0){
            if(_date == 1){
              return (1+ " day ago");
            }else if(_date < 7){
              return (_date+ " days ago");
            }else{
              return (Math.floor(_date/7)+" weeks ago");
            }
        }
        else if(hours > 0){
          if(hours == 1){
            return (1+ " hour ago");
          }else{
            return (hours+ " hours ago");
          }
        }else if(minutes > 0){
          if(minutes == 1){
            return (1+ " minute ago");
          }else{
            return (minutes + " miinutes agao");
          }
        }
      
      }
      

    return (
        <View style={styles.view}>
            <StatusBar backgroundColor='#000000' barStyle="light-content"/>
            {/* show unable to load feed if internet issue is encountered */}
            {Err == true? 
                (
                    <View style={{justifyContent: 'center',alignItems: 'center',height:'100%',width:'100%'}}>
                        <Text style={{color:'#ffffff'}}>Unable to load feed</Text>
                        <View style={{width:200,height:40,justifyContent: 'center',alignItems: 'center',marginTop:20}}>
                            <Icono name='reload-circle' size={50} color={'#717171'} onPress={()=>onReload()}/>
                        </View>
                    </View>
                )
                :
                (
                    null
                )
            }



            {isLoading ? <ActivityIndicator size="large" color="#eb8d35"/> : (
            <FlatList style={{flexDirection:'column',width:'99%'}}                                
                data={feed}
                refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh}/>} 
                keyExtractor={({ id }, index) => index.toFixed()}
                renderItem={({ item }) => (
                    <View style={styles.Post}>                        
                        <View style={styles.TopPostContent}>
                            <View style={styles.ProfileImageSec}>
                                {item.artist_thumbnail?

                                    <Image source={{uri: item.artist_thumbnail}} style={{width:40,height:40,borderRadius:50,borderWidth:2,borderColor:'#ffffff'}}/>
                                    :
                                    (
                                        <View style={{width:40,height:40,borderRadius:50,borderWidth:2,borderColor:'#ffffff',justifyContent: 'center',alignItems: 'center',backgroundColor:'#717171'}}>
                                            <Icons name="user" size={25} color={'white'}/>
                                        </View>
                                    )
                                }

                                <View>

                                    <Text style={{marginLeft:10,fontSize:15,color:'#ffffff'}}>{item.artist_name}</Text>
                                    <Text style={{marginLeft:10,fontSize:10,color:'#717171'}}>
                                        Posted a video {getDate(item.post_date)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>navigate('Player',item)} style={{width:'100%'}}>
                            <ImageBackground style={{borderRadius:5,width:'100%',height:280,resizeMode:'cover',justifyContent:'flex-end',alignItems:'flex-start'}} source={{uri:item.post_cover_url}}>
                                <Text style={styles.postdesc}>{item.post_name}</Text>
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
        backgroundColor:'rgba(0,0,0,.5)',
        padding:7,
        height:'auto',
        marginBottom:30,
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        flexDirection:'column-reverse',
        lineHeight:20,
        maxWidth:'80%'
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