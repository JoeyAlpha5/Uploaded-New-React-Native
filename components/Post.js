import React from 'react';
import {View, Text, Image,StyleSheet, ImageBackground, FlatList,StatusBar ,ActivityIndicator,TouchableOpacity, RefreshControl,Dimensions} from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
import Icono from 'react-native-vector-icons/Ionicons';
import { useScrollToTop } from '@react-navigation/native';
const WIDTH = Dimensions.get('window').width;
const Post = (props) =>{
    const ref = React.useRef(null);
    useScrollToTop(ref);
    return(
        <View style={{flex:1}}>
            <FlatList
                ref={ref}                              
                data={props.feed}
                refreshControl={<RefreshControl refreshing={props.Refreshing} onRefresh={props.onRefresh}/>} 
                ListFooterComponent={<ActivityIndicator size="small" color="#eb8d35"/>}
                keyExtractor={({ id }, index) => index.toFixed()}
                renderItem={({ item }) => (
                    <View style={styles.Post}>                        
                        <View style={styles.TopPostContent}>
                            <View style={styles.ProfileImageSec}>
                                {item.artist_thumbnail?

                                    <Image source={{uri: item.artist_thumbnail}} style={{width:40,height:40,borderRadius:50,backgroundColor:'#717171',borderWidth:2.2,borderColor:'#eb8d35'}}/>
                                    :
                                    (
                                        <View style={{width:40,height:40,borderRadius:50,justifyContent: 'center',alignItems: 'center',backgroundColor:'#242424'}}>
                                            <Icono name="person-outline" size={25} color={'#717171'}/>
                                        </View>
                                    )
                                }

                                <View>

                                    <Text style={{marginLeft:10,fontSize:15,color:'#ffffff'}}>{item.artist_name}</Text>
                                    <Text style={{marginLeft:10,fontSize:10,color:'#717171'}}>
                                        Posted a video {item.post_age}
                                    </Text>
                                </View>
                            </View>
                            <View style={{marginRight:30}}>
                                <Ant name="ellipsis1" size={25} color={'#fff'}/>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>props.play('Player',item)} style={{width:'100%'}}>
                            <ImageBackground style={{borderRadius:5,width:'100%',height:280,resizeMode:'cover',justifyContent:'space-between',alignItems:'flex-end',flexDirection: 'row',backgroundColor:'#717171'}} source={{uri:item.post_cover_url}}>
                                <Text style={styles.postdesc}>{item.post_name}</Text>
                                <Text style={{color:'#717171',marginRight:10,marginBottom: 5,color:'white',backgroundColor: '#000000',padding: 3,fontSize:12,borderRadius:6}}>
                                    {props.PostDuration(item.post_duration)}
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        {/* <View style={{width:'98%',height:1,backgroundColor:'#000000',marginTop:10}}></View> */}

                        <View style={styles.BottomPostContent}>
                            <View style={styles.postIcons}>
                                
                                {item.user_num_likes_post == 1?
                                    (
                                        <View style={{flexDirection:'row'}}>
                                            <Ant name='heart' size={25} onPress={()=>props.likePost(item.post_id)} color={'#eb8d35'}/><Text style={{color:'#717171',marginLeft:7}}>{item.post_num_likes}</Text>
                                        </View>
                                    ):
                                    (
                                        <View style={{flexDirection:'row'}}>
                                            <Ant name='heart' size={25} onPress={()=>props.likePost(item.post_id)} color={'#fff'}/><Text style={{color:'#717171',marginLeft:7}}>{item.post_num_likes}</Text>
                                        </View>
                                    )

                                }

                                <Icon name='comment-o' size={25} color={'#fff'}  style={{marginLeft:28}}/><Text style={{color:'#717171',marginLeft:7}}>{props.CommentsCount(item.post_id)}</Text>
                                <Icono name='ios-eye-outline' size={28} color={'#fff'} style={{marginLeft:28}}/><Text style={{color:'#717171',marginLeft:7}}>{item.post_num_views}</Text>
                            </View>
                            <View>
                                <Icons name='repeat' size={20} color={'#fff'}  style={{marginRight:10}}/><Text style={{color:'#717171',marginLeft:7}}></Text>
                            </View>
                        </View>
                        
                </View>

            )}
             onEndReached={()=>{
                props.Feed(false,"threshold");
            }} onEndReachedThreshold={2}
            />
        </View>
    )
}
export default Post