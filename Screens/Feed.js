import React, {useEffect,useState} from 'react';
import {ActivityIndicator, View, Text, Image,StyleSheet, ImageBackground, FlatList,StatusBar ,TouchableOpacity, RefreshControl, Alert,ScrollView,SafeAreaView,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Icono from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import { set } from 'react-native-reanimated';
import { firebase, comments } from '../firebase/firebase';
import publicIP from 'react-native-public-ip';
import Ant from 'react-native-vector-icons/AntDesign';
import { Header } from 'react-native-elements';
import { useScrollToTop } from '@react-navigation/native';

//components
import Post from '../components/Post';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

//

export const Feed = ({navigation, route}) =>{
    const [feed,setFeed] = useState([]);
    const [count,setCount] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [Err,setErr] = useState(false);
    const [Refreshing,setRefreshing] = useState(false);
    const getFeed = async (Reload,from)=>{
        let feedCount = 0;
        let user_id = await AsyncStorage.getItem("user_id");
        if(Reload != true){
            feedCount = count;
        }
        console.log("getting more videos, count is ", feedCount);
        console.log("from ", from);
        var savedEmail = await AsyncStorage.getItem("email");
        publicIP()
        .then(ip=>{
            console.log("ip address is ", ip, "feed count ", feedCount," user_id ",user_id," saved email ",savedEmail);
            fetch('http://185.237.96.39:3000/users/users?type=getHomeList3&&email='+savedEmail+'&&count='+feedCount+"&&user_ip="+ip+"&&user_id="+user_id)
            .then((response) =>response.json())
            .then((json) =>{ 
                //if reloading set new state, else update feed state
                console.log("json ", json);
                setErr(false);
                setRefreshing(false); 
                if(Reload == true){
                    setFeed(json.Response);
                }else{
                    setFeed([...feed,...json.Response]);
                }
            
            })
            .catch((error) => {
                console.error("error ",error);
                if(feed.length != 0){
                    Alert.alert("Unable to load new posts, please check your internet connection.");
                    setRefreshing(false);
                }else{
                    setErr(true);
                }   
            })
            .finally(() =>{ 
                setLoading(false); 
                if(Reload == true){
                    setCount(11);
                }else{
                    setCount(count+11);
                }
                setRefreshing(false);
                console.log("feed count is ", count) 
            });
        })  
    }
    useEffect(() => {
        //get the feed on load
        SplashScreen.hide();
        GetIp();
        getFeed(false,"useffect");
      }, []);


      const GetIp = ()=>{

      }

    // navigate to view the post
    const navigate = (page, post) =>{
        //get current feed into separate array
        let current_array = [...feed];
        for(let array_count = 0; array_count < current_array.length; array_count++){
            //update the view count of selected post
            if(post.post_id == current_array[array_count].post_id){
                var current_post = current_array[array_count];
                current_post['post_num_views'] += 1;
                current_array[array_count] = current_post;
                //update feed array in state
                setFeed(current_array);
                // console.log(current_array.slice(array_count+1,array_count+5));
                navigation.navigate(page, {data:current_post,updateLike:updateLike,playlist:current_array.slice(array_count+1,array_count+6)});
                break;
            }
        }
    }
    //
    const onRefresh = ()=>{
        setRefreshing(true);
        getFeed(true,"onrefresh");
    }

    const onReload=()=>{
        setErr(false);
        setLoading(true);
        setFeed([]);
        getFeed(true,"onreload");
    }
    const getPostDuration = (post_duration)=>{
        var int_post_duration = parseInt(post_duration);
        var time_in_minutes = (int_post_duration/60).toFixed(2);
        var minutes = Math.floor(parseFloat(time_in_minutes));
        var seconds = (parseFloat(time_in_minutes) - minutes)*60;
        seconds = Math.floor(seconds);
        seconds < 10? seconds = '0'+seconds.toString(): seconds = seconds.toString();
        return minutes.toString()+":"+seconds;
    }

    const getCommentsCount = (post_id)=>{
        var comments_count = 0;
        comments.orderByChild('post_id').equalTo(post_id).on('value',data=>{
            console.log("comments count ", data.numChildren());
            comments_count =  data.numChildren();
        });
        return comments_count;
    }

    //this method is called from the player page
    const updateLike = (liked,like_count,post_id,outcome)=>{
        let current_feed = [...feed];
        for(let feed_count = 0; feed_count < current_feed.length; feed_count++){
            if (current_feed[feed_count].post_id == post_id){
                let current_post = current_feed[feed_count];
                current_post["post_num_likes"] = like_count;
                current_post["user_num_likes_post"] =  liked;
                console.log("current post ", current_post);
                setFeed(current_feed);
                break;
            }
        }
        
    }

    const like = async (post_id) =>{
        var user_id = await AsyncStorage.getItem("user_id");
        console.log("post id ", post_id);
        console.log("user id is ", user_id);
        fetch('http://185.237.96.39:3000/users/users?type=userlikespost&&post_id='+post_id+'&&user_id='+user_id)
        .then((re)=>re.json())
        .then(json=>{
            console.log("liked ",json);
            var liked;
            if(json.Outcome == "Success. User UNLiked post"){
                liked =  0;
            }else{
                liked =  1;
            }
            updateLike(liked,json.num_likes,post_id);
        })
    }


    // const getDate = (date) => {
    //     var today = new Date();
    //     var other_date = new Date(date);
    //     var date_difference = new Date(today.getTime()-other_date.getTime());
    //     var minutes = date_difference.getMinutes();
    //     var hours =  date_difference.getHours();
    //     var _date = date_difference.getDate();
    //     var month = date_difference.getMonth();
    //     var year = date_difference.getFullYear()-1970;
    //     if(year > 0){
    //       if(year == 1){
    //         return (1+ " year ago");
    //       }else{
    //         return (year + " years ago");
    //       }
    //     }else if(month > 0 ){
    //       if(month == 1){
    //         return (1+ " month ago");
    //       }else{
    //         return (month+ " months ago");
    //       }
    //     }else if(_date > 0){
    //         if(_date == 1){
    //           return (1+ " day ago");
    //         }else if(_date < 7){
    //           return (_date+ " days ago");
    //         }else{
    //           return (Math.floor(_date/7)+" weeks ago");
    //         }
    //     }
    //     else if(hours > 0){
    //       if(hours == 1){
    //         return (1+ " hour ago");
    //       }else{
    //         return (hours+ " hours ago");
    //       }
    //     }else if(minutes > 0){
    //       if(minutes == 1){
    //         return (1+ " minute ago");
    //       }else{
    //         return (minutes + " miinutes agao");
    //       }
    //     }
      
    // }
      
    return (
        <>
            <Header
                placement="left"
                containerStyle={{
                    backgroundColor: '#181818',
                    borderBottomWidth: 0,
                }}
                centerComponent={{ text: 'Uploaded', style: { color: '#fff',fontSize:20,borderBottomWidth:0 } }}        
            />
            <View style={styles.view}>
            {/* <StatusBar backgroundColor='red' barStyle="light-content"/> */}
                <StatusBar backgroundColor='#000000' barStyle="light-content"/>
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

                <Post feed={feed} play={navigate} Feed={getFeed} likePost={like} Refreshing={Refreshing} onRefresh={onRefresh} PostDuration={getPostDuration} CommentsCount={getCommentsCount} />
            )}
        </View>
    </>
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
        height:'100%',
        flex: 1,
        height:HEIGHT,
    },
    Post:{
        height:400,
        width:'98%',
        alignSelf: 'center',
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