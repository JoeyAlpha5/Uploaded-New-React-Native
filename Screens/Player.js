import React, { useEffect, useState, Component } from 'react';
import {View, Text, Dimensions, StatusBar,StyleSheet,TouchableOpacity, TextInput, Image, ActivityIndicator,Button} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Icono from 'react-native-vector-icons/Fontisto';
import Ant from 'react-native-vector-icons/AntDesign';
// class  extends Component
const Player = ({navigation, route}) =>{
    useEffect(() => {
        console.log(route.params.data);
    });
    const [forwardBackDisplay,setforwardBackDisplay] = useState(false);
    const data = route.params.data;
    const {width, height} = Dimensions.get("screen");
    const videoProgress = (data)=>{
        console.log(data);
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
        this.player.ref.seek(0)

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
                            ref={(ref) => {
                                this.player = ref
                              }}    
                            style={{width:width,height:height/3, backgroundColor:'#000000'}} />
                    </View>               
                
                <View style={styles.postDetails}>
                    <View style={styles.topPostDetails}>
                            <Image source={{uri:data.artist_thumbnail}} style={{width:40,height:40,borderRadius:50}}/>
                    
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
                            <Icon name='eye' size={21} color={'#717171'} style={{marginLeft:10}}/><Text style={{fontSize:12,color:'#717171',marginLeft:15}}>{data.post_num_views}</Text>
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

            <View style={styles.commentsInput}>
                <TextInput style={{width:'100%', height:40,paddingLeft:15,}} placeholder={"Add comment.."}/>
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
