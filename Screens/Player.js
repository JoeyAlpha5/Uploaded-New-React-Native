import React, { useEffect, useState, Component } from 'react';
import {View, Text, Dimensions, StatusBar,StyleSheet,TouchableOpacity, TextInput, Image, ActivityIndicator,FlatList,Keyboard} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Icono from 'react-native-vector-icons/Fontisto';
import Ant from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Simple from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { firebase, comments } from '../firebase/firebase';
import publicIP from 'react-native-public-ip';
import { Header } from 'react-native-elements';
import { CommonActions, useNavigation } from '@react-navigation/native'

//components
import PlayerList from '../components/PlayerList';
import CommentsComponent from '../components/Comments';
//
const Player = ({navigation: { setParams }, route}) =>{
    const [Comments,setComments] = useState([]);
    const [commentsSpinner,setcommentsSpinner] = useState(true);
    const [commentsError,setcommentsError] = useState(false);
    const [views,setViews] = useState(0);
    const [viewCommentButton, setCommentButton] = useState(false);
    const [comment,setComment] = useState();
    const [commentsCount,setCommentsCount] = useState(0);
    const [data,setData] = useState(route.params.data);
    const [liked,setLiked] =useState(0);
    const [likesCount,setLikesCount] = useState(0);
    const [playlist,setPlaylist] = useState([]);
    // const [playlistCount,setPlaylistCount] = useState(0);
    const [showList,setShowlist] = useState(true);
    const [paused,setPause] = useState(false);
    // const [CurrentPostId,setCurrentPostId] = useState();
    const [videoSecondsLeft,setVideoSecondsLeft] = useState();
    const updateLike = route.params.updateLike;
    const navigation = useNavigation();

    const getComments = (int_post_id)=>{
        let comments_array = []
        comments.orderByChild('post_id').equalTo(int_post_id).once('value',data=>{
            // console.log("comments count ", data.numChildren());
            setCommentsCount(data.numChildren());
            setcommentsSpinner(false);
            data.forEach(comment=>{
                comments_array.push(comment.val());
                // console.log(comment.val());
            });
        }).then(()=>{
            console.log("comments ", comments_array);
            setComments(comments_array);
        });
    }

    const getPostView = async (post_id)=>{
        // console.log("updated post is ", post);
        // console.log("data is ", data);
        var user_id = await AsyncStorage.getItem("user_id");
        console.log("user id is ", user_id);
        publicIP()
        .then(ip=>{
            fetch('http://185.237.96.39:3000/users/users?type=setViewsv2&&post_id='+post_id+'&&user_id='+user_id+"&&user_ip="+ip)
            .then(response=>response.json())
            .then(json=>{
                setViews(json.view_count);
            })
        })
    }


    const getMorePlaylist = async (post_id) =>{
        var user_id = await AsyncStorage.getItem("user_id");
        publicIP()
        .then(ip=>{
            // http://185.237.96.39:3000/users/users?type=getPostPlayList&&post_id=247&&count=11&&user_ip=156.155.163.160&&user_id=1
            fetch('http://185.237.96.39:3000/users/users?type=getPostPlayList&&post_id='+post_id+'&&user_id='+user_id+"&&user_ip="+ip+"&&count=5")
            .then(response=>response.json())
            .then(json=>{
                // console.log("set params");
                // console.log(json.Response);
                setPlaylist([...playlist,...json.Response]);
                // setPlaylist(json.Response);
                // AsyncStorage.setItem("playlist",JSON.stringify(playlist));
                // setParams({playlist:json.Response});
                // console.log(route.params.playlist);
                // setPlaylist([...playlist,...json.Response]);
                // setCount(count+11);
            })
        })
    }

    useEffect(() => {
        // console.log(data);
        // console.log("use effect just ran");
        setLikesCount(data.post_num_likes);
        setLiked(data.user_num_likes_post);
        // setPlaylist(route.params.playlist);
        // getMorePlaylist(data.post_id);
        // setPlaylist(route.params.playlist);
        console.log("post liked ", data.user_num_likes_post);
        console.log("getting comments");
        getComments(data.post_id);
        getPostView(data.post_id);
        //listen for comments, remember to come back to close this subscription
        comments.off();
        comments.on('value',()=>{
            getComments(data.post_id);
        });

        // if(){

        // }
        console.log("show playlist ", route.params.showPlaylist);
        getMorePlaylist(data.post_id);

    }, [data]);

    const {width, height} = Dimensions.get("screen");
    //
    const goBack = ()=>{
        navigation.goBack(null);
        console.log("back button pressed");
    }

   const onChangeText = (text) =>{
       //hide comments
        // setCommentsDisplay(false);
        setShowlist(false);
       if(text == ""){
            setCommentButton(false);
       }
       else if(text.length > 250){
        console.log("comments length",text.length);
       }
       else{
            setCommentButton(true);
       }
       setComment(text);

   }

   const submitComment = async ()=>{
        console.log(comment);
        var username = await AsyncStorage.getItem("username");
        comments.push({"comment":comment, username:username, post_id:data.post_id});
        setCommentButton(false);
        setComment('');
   }

   const PostLike = async ()=>{
    //    console.log("post like ",data.post_id);
        var user_id = await AsyncStorage.getItem("user_id");
        fetch('http://185.237.96.39:3000/users/users?type=userlikespost&&post_id='+data.post_id+'&&user_id='+user_id)
        .then(re=>re.json())
        .then(json=>{
            console.log(json);
            var liked;
            if(json.Outcome == "Success. User UNLiked post"){
                setLiked(0);
                liked = 0;
            }else{
                setLiked(1);
                liked = 1;
            }
            setLikesCount(json.num_likes);
            updateLike(liked,json.num_likes,data.post_id);
        })

   }


   const playNext =async (post)=>{
    //    setCurrentPostId(post.post_id);
    //    console.log("current post id ",CurrentPostId);
       setData(post);
    //    AsyncStorage.setItem("current_post_id",JSON.stringify(post.post_id));
    //    setLikesCount(post.post_num_likes);
    //    setLiked(post.user_num_likes_post);
    //    getComments(post.post_id);
    //    getPostView(post.post_id);
    //    comments.off();
    //     //listen for comments, remember to come back to close this subscription
    //     comments.on('value',()=>{
    //         getComments(post.post_id);
    //     });

        // getMorePlaylist(post.post_id);

        // setPause(false);
   }


    const videoFinished = (progressData) =>{
        // console.log("progress data ",progressData);
        // var currentTime = progressData.currentTime;
        // var videoDuration = progressData.playableDuration;
        // var seekable_duration =  progressData.seekableDuration;
        // // var video
        // var SecondsLeft = videoDuration-currentTime
        // var SecondsLeftRounded = Math.floor(SecondsLeft);
        // if(videoSecondsLeft != undefined && videoSecondsLeft == SecondsLeft && SecondsLeft > 0){
        //     console.log("current time  and duration ", currentTime, " video duration ",videoDuration, " seconds left ", SecondsLeft);

        // }   
        // setVideoSecondsLeft(SecondsLeft);
        // console.log("current time  and duration ", currentTime, " video duration ",videoDuration, " seconds left ", SecondsLeft);
        // if(SecondsLeftRounded == 0 && SecondsLeft > 0 && videoDuration == seekable_duration && paused == false){
        //     setPause(true);
        //     console.log("video paused");
        //     // AutoPlayNext();
        // for(let count = 0; count < route.params.playlist.length; count++){
        //     if(route.params.playlist[count].post_id==CurrentPostId){
        //         console.log("next post is ", playlist[count+1]);
        //         playNext(playlist[count+1]);
        //         break;
        //     }
        // }
        // }
        // if(CurrentPostId != undefined && SecondsLeft == 0 && currentTime != 0 && videoDuration != 0){
        // // if(CurrentPostId != undefined && currentTime == videoDuration){
        //     //check what the next post is 
            // for(let count = 0; count < playlist.length; count++){
            //     if(playlist[count].post_id==CurrentPostId){
            //         console.log("current time  and duration ", currentTime, " ", videoDuration);
            //         console.log("next post is ", playlist[count+1]);
            //         playNext(playlist[count+1]);
            //         break;
            //     }
            // }
        // }  
    }

    const videoPlaying = async () =>{
        // console.log("current post liked ", liked);
        // setPlaylistCount(playlistCount+1);
        // var current_post_id = await AsyncStorage.getItem("current_post_id");
        // var playlist = await JSON.parse(AsyncStorage.getItem("playlist"));
        // console.log("current post id is ",current_post_id," and current playlist is ", playlist);

        // for(let count = 0; count < playlist ; count++){
        //     if(playlist[count].post_id==current_post_id){
        //         console.log("next post is ", playlist[count+1]);
        //         playNext(playlist[count+1]);
        //         break;
        //     }
        // }
        // playNext(route.params.playlist[playlistCount]);
        // if(playlistCount == 4){
        //     // setPlaylistCount(0);
        // }else{
        // }
        // console.log("current video is  ", data.post_id);
        // console.log("current playlis t", route.params.playlist);
        

    }
  
    return (
        <View style={{width:width, flex: 1,justifyContent:'space-between',backgroundColor:'#000000'}}>
            <StatusBar backgroundColor='#000000' barStyle="light-content"/>
            <View style={{flex: 1,alignItems: 'center',}}>
                <View style={{height:height/3,justifyContent: 'center',alignItems: 'center',}}>
                    <VideoPlayer source={{uri: data.post_source_url }} 
                        // repeat={true} 
                        // onProgress={videoFinished}
                        onBack={goBack}  
                        navigator={navigation}    
                        ignoreSilentSwitch={"obey"}                          
                        resizeMode={"contain"}
                        // muted={true}
                        paused={paused}
                        seekColor={"#eb8d35"}
                        disableVolume={true}
                        controlTimeout={5000}
                        disableFullscreen={true} 
                        onEnd={videoPlaying}
                        style={{width:width,height:height/3, backgroundColor:'#000000'}} />
                </View>               
                
                <View style={styles.postDetails}>
                    <View style={styles.topPostDetails}>
                        {data.artist_thumbnail?
                            <Image source={{uri:data.artist_thumbnail}} style={{width:40,height:40,borderRadius:50,backgroundColor:'#717171',borderWidth:2.2,borderColor:'#eb8d35'}}/>
                        :
                        (
                            <View style={{width:40,height:40,borderRadius:50,justifyContent: 'center',alignItems: 'center',backgroundColor:'#242424'}}>
                                <Ionicons name="person-outline" size={25} color={'#717171'}/>
                            </View>
                        )
                        }

                    
                        <View style={{marginLeft:15,width:'73%'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,color:'white'}}>{data.artist_name}</Text>
                            <Text style={{width:'100%',color:'white'}}>{data.post_name}</Text>
                            <Text style={{color:'#717171',fontSize:12}}>posted {data.post_age}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:10}}>

                        {liked == 1?
                            (
                                <View style={{marginTop:2,marginRight:15}}>
                                    <Ant name='heart' size={18} onPress={()=>PostLike()} color={'#eb8d35'}/><Text style={{fontSize:12,color:'#717171',marginLeft:5,marginTop:7}}>{likesCount}</Text>
                                </View>
                            ):
                            (
                                <View style={{marginTop:2,marginRight:15}}>
                                    <Ant name='heart' size={18} onPress={()=>PostLike()} color={'#fff'}/><Text style={{fontSize:12,color:'#717171',marginLeft:5,marginTop:7}}>{likesCount}</Text>
                                </View>
                            )
                        }



                        <View style={{marginRight:10}}>
                            <Ionicons name='ios-eye-outline' size={22} color={'#fff'} style={{marginLeft:10}}/><Text style={{fontSize:12,color:'#717171',marginLeft:15,marginTop:5}}>{views}</Text>
                        </View>
                        <View style={{marginTop:2}}>
                            <Icono  name='share' size={15} color={'#fff'} style={{marginLeft:10,marginTop:2}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.commentsBar}>
                    <Text style={styles.commentsHeader}>Comments: {commentsCount}</Text>
                    <View style={styles.follow}>
                        <Text style={{color:'white'}}>Follow</Text>
                    </View>
                </View>


            {route.params.showPlaylist != false?
                (<View style={styles.VideoDropDown}>
                    <Text style={{color:'#717171',fontSize:13,marginLeft:5}}>View next</Text>
                    {showList == true?
                        (
                            <Icons name="chevron-up" onPress={()=>setShowlist(false)} color="#717171" size={20} style={{marginRight:12}}/>
                        ):
                        (
                            <Icons name="chevron-down" onPress={()=>setShowlist(true)} color="#717171" size={20} style={{marginRight:12}}/>
                        )
                    }
                </View>):
                null
            }       

                {showList == true && route.params.showPlaylist != false?
                    <PlayerList listArray={playlist} next={playNext} loadMore={getMorePlaylist}/>:null
                }

               
                <CommentsComponent comments={Comments} spinner={commentsSpinner}/>
                
            </View>
            <View style={{width:'100%',alignItems:'center'}}>
                <View style={styles.commentsInput}>
                    <TextInput style={{height:40,paddingLeft:15,color:'white',width:'85%'}} placeholderTextColor="#717171"  value={comment} onChangeText={text => onChangeText(text)} placeholder={"Add comment.."}/>
                    {viewCommentButton == true?
                        (
                            <Ionicons name="send-sharp"  onPress={()=>submitComment()} size={25} color={'#717171'} style={{marginTop:10,marginRight:10}}/>
                        )
                        :
                        null
                    }
                </View>
                </View>
            </View>
    )
}
export  default Player
const styles = StyleSheet.create({
    VideoDropDown:{
        width:'98%',
        backgroundColor:'#181818',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10,
        borderTopWidth:0.2,
        borderColor:'#000000',
        padding:10
        
    },
    follow:{
        marginRight:10,
        width:80,
        // borderColor:'#717171',
        height:30,
        // borderWidth:1,
        backgroundColor: '#eb8d35',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:4
    },  
    topPostDetails:{
        // justifyContent:'space-between',
        flexDirection:'row',
        paddingTop:5, 
        // width:'70%',
        // backgroundColor:'#000'
    },
    postDetails:{
        width:'98%',
        height:'auto',
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#181818',
        shadowColor: "#000",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft:5,
        paddingRight:100,
        paddingBottom:10
    },
    commentsInput:{
        width:'98%',
        backgroundColor:'#181818',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // flex:1
    },
    commentsHeader:{
        marginLeft:5,
        color:'white'
    },
    commentsBar:{
        width:'98%',
        height:50,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingTop:10,
        // marginBottom:10,
        backgroundColor:'#181818',
        // shadowColor: "#000",
        // borderTopWidth:0.2,
        // borderColor:'#717171',
        borderTopWidth:0.2,
        borderColor:'#000000',
        // flex: 1,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 3,

    }
})
