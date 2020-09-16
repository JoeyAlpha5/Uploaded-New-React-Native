import React, { useEffect, useState, Component } from 'react';
import {View, Text, Dimensions, StatusBar,StyleSheet,TouchableOpacity, TextInput, Image, ActivityIndicator,FlatList,Keyboard} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Icono from 'react-native-vector-icons/Fontisto';
import Ant from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
// class  extends Component
import { firebase, comments } from '../firebase/firebase';
const Player = ({navigation, route}) =>{
    const [Comments,setComments] = useState([]);
    const [commentsSpinner,setcommentsSpinner] = useState(true);
    const [commentsError,setcommentsError] = useState(false);
    const [views,setViews] = useState(0);
    const [viewCommentButton, setCommentButton] = useState(false);
    const [comment,setComment] = useState();
    const data = route.params.data;
    const getComments = ()=>{
        var int_post_id = data.post_id;
        let comments_array = []
        comments.once('value',data=>{
            setcommentsSpinner(false);
            data.forEach(comment=>{
                if(comment.val().post_id == int_post_id){
                    comments_array.push(comment.val());
                    console.log(comment.val());
                }
            });
        }).then(()=>{
            console.log("comments ", comments_array);
            setComments(comments_array);
        });
    }

    const getPostView = async ()=>{
        var user_id = await AsyncStorage.getItem("user_id");
        console.log("user id is ", user_id);
        var post_id = route.params.data.post_id;
        fetch('http://185.237.96.39:3000/users/users?type=setViewsv2&&post_id='+post_id+'&&user_id='+user_id)
        .then(response=>response.json())
        .then(json=>{
            console.log(json);
            setViews(json.view_count);
        })
    }

    useEffect(() => {
        console.log("getting comments");
        getComments();
        getPostView();
        //listen for comments, remember to come back to close this subscription
        comments.on('value',()=>{
            getComments();
        });
    }, []);
    const [forwardBackDisplay,setforwardBackDisplay] = useState(false);
    const {width, height} = Dimensions.get("screen");
    const videoProgress = (data)=>{
        // console.log(data);
    }
    //
    const goBack = ()=>{
        navigation.goBack(null);
        console.log("back button pressed");
    }
    const displayForwardBackDisplay = ()=>{
        setforwardBackDisplay(true);
        setTimeout(()=>{
            setforwardBackDisplay(false);
        },5000)
        console.log("controls showing");
    }
    const hideForwardBackDisplay = ()=>{
        setforwardBackDisplay(false);
        console.log("controlshiding");
    }
    const forwardVideo = () =>{
        console.log("video forward");
    }
    const rewindVideo = () =>{
        console.log("video rewind");
    }

   const onChangeText = (text) =>{
       //hide comments
        // setCommentsDisplay(false);
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

    return (
        <View style={{width:width, flex: 1,justifyContent:'space-between'}}>
            <StatusBar backgroundColor='#000000' barStyle="light-content"/>
            <View style={{flex: 1,}}>
                
                    <View style={{height:height/3,justifyContent: 'center',alignItems: 'center',}}>
                        {forwardBackDisplay == true ?
                            (
                                <View style={{position:'absolute',zIndex: 1,flexDirection: 'row',justifyContent: 'space-between',width:'60%',padding:5,opacity:.8}}>
                                    <Ant name='banckward' size={30} color={'#fff'} onPress={rewindVideo} style={{marginLeft:10,marginTop:2}}/>
                                    <Ant name='forward' size={30} color={'#fff'}  style={{marginLeft:10,marginTop:2}} onPress={()=>console.log("forward pressed")}/>
                                </View>
                            ):
                            null
                        }
                        <VideoPlayer source={{uri: data.post_source_url }} 
                            repeat={true} 
                            onBack={goBack}  
                            onShowControls={displayForwardBackDisplay}
                            onHideControls={hideForwardBackDisplay}
                            navigator={navigation}    
                            ignoreSilentSwitch={"obey"}                          
                            resizeMode={"contain"}
                            muted={true}
                            disableVolume={true}
                            controlTimeout={5000}
                            disableFullscreen={true}
                            onProgress={videoProgress}  
                            style={{width:width,height:height/3, backgroundColor:'#000000'}} />
                    </View>               
                
                <View style={styles.postDetails}>
                    <View style={styles.topPostDetails}>

                        {data.artist_thumbnail?
                            <Image source={{uri:data.artist_thumbnail}} style={{width:40,height:40,borderRadius:50}}/>
                        :
                        (
                            <View style={{width:40,height:40,borderRadius:50,borderWidth:2,borderColor:'#ffffff',justifyContent: 'center',alignItems: 'center',backgroundColor:'#717171'}}>
                                <Icons name="user" size={25} color={'white'}/>
                            </View>
                        )
                        }

                    
                        <View style={{marginLeft:15,width:'63%'}}>
                            <Text style={{fontWeight:'bold',fontSize:15}}>{data.artist_name}</Text>
                            <Text style={{width:'80%'}}>{data.post_name}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:10,marginRight:10}}>
                        <View style={{marginTop:2}}>
                            <Icons name='heart' size={19} color={'#717171'}/><Text style={{fontSize:12,color:'#717171',marginLeft:5}}>{data.post_num_likes}</Text>
                        </View>
                        <View>
                            <Icon name='eye' size={21} color={'#717171'} style={{marginLeft:10}}/><Text style={{fontSize:12,color:'#717171',marginLeft:15}}>{views}</Text>
                        </View>
                        <View style={{marginTop:2}}>
                            <Icono name='share' size={15} color={'#717171'} style={{marginLeft:10,marginTop:2}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.commentsBar}>
                    <Text style={styles.commentsHeader}>Comments: {data.post_num_comments}</Text>
                    <View style={styles.follow}>
                        <Text>Follow</Text>
                    </View>
                </View>
                {/* comments view */}
                <View style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'column',flex: 1}}>
                    {commentsSpinner == true?
                        
                        (<ActivityIndicator size="large" color="#eb8d35"/>)
                        :
                        (
                            <FlatList
                            data={Comments}
                            style={{width:'90%'}}
                            keyExtractor={({ id }, index) => index.toFixed()}
                            renderItem={({ item }) => (
                            <View style={{flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:1,marginTop:20,borderColor:'#e6e6e6',height:'auto',padding: 10,paddingTop:20,paddingBottom:20,width:'90%'}}>
                                <View style={{width:40,height:40,borderRadius:50,borderColor:'#e4e6e8',justifyContent: 'center',alignItems: 'center',backgroundColor:'#717171'}}>
                                    <Icons name="user" size={25} color={'white'}/>
                                </View>
                                <View style={{marginLeft:15,}}>
                                    <Text style={{color:'black',fontSize:11,color:'#717171'}}>
                                        {item.username}
                                    </Text>
                                    <Text style={{fontSize:12,lineHeight:18}}>
                                        {item.comment}
                                    </Text>
                                </View>
                            </View>

                            )}
                        />
                        )
                    }
                </View>
                {/* comments view ends here */}
            </View>

            <View style={styles.commentsInput}>
                <TextInput style={{height:40,paddingLeft:15,}} value={comment} onChangeText={text => onChangeText(text)} placeholder={"Add comment.."}/>
                {viewCommentButton == true?
                    (
                        <Ionicons name="send-sharp"  onPress={()=>submitComment()} size={25} color={'#717171'} style={{marginTop:10,marginRight:10}}/>
                    )
                    :
                    null
                }
            </View>
        </View>
    )
}
export  default Player
const styles = StyleSheet.create({
    follow:{
        marginRight:10,
        width:80,
        borderColor:'#e6e6e6',
        height:30,
        borderWidth:1,
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
        width:'100%',
        height:'auto',
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#fff',
        shadowColor: "#000",
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:10
    },
    commentsInput:{
        width:'100%',
        backgroundColor:'#e6e6e6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex:1
    },
    commentsHeader:{
        marginLeft:5
    },
    commentsBar:{
        width:'100%',
        height:50,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingTop:10,
        backgroundColor:'#fff',
        shadowColor: "#000",
        borderTopWidth:0.2,
        borderColor:'#e4e6e8',
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
