import React, { useEffect, useState, Component } from 'react';
import {View, Text, Dimensions, StatusBar,StyleSheet,TouchableOpacity, TextInput, Image, ActivityIndicator,FlatList} from 'react-native';
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
    const getComments = ()=>{
        // let comments_array = []
        // comments.onSnapshot(snapshot=>{
        //     console.log("commments count", snapshot)
        //     snapshot.forEach(doc=>{
        //         // comment.push(doc.data());
        //         console.log("comment ",doc.data());
        //     });
        //     // setComments(comments_array);
        // });
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
        // getComments();
        getPostView();
    }, []);
    const [forwardBackDisplay,setforwardBackDisplay] = useState(false);
    const data = route.params.data;
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
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'column',flex: 1}}>

                    {commentsSpinner == true?
                        
                        (<ActivityIndicator size="large" color="#eb8d35"/>)
                        :
                        (
                            <FlatList
                            data={Comments}
                            keyExtractor={({ id }, index) => index.toFixed()}
                            renderItem={({ item }) => (
                                <Text style={{color:'black',marginTop:50}}>
                                    Hello world
                                </Text>
                            )}
                          />
                        )

                    }
            </View>
            <View style={styles.commentsInput}>
                <TextInput style={{height:40,paddingLeft:15,}} placeholder={"Add comment.."}/>
                <Ionicons name="send-sharp" size={25} color={'#717171'} style={{marginTop:10,marginRight:10}}/>
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
        borderColor:'#e4e6e8'
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 3,

    }
})
