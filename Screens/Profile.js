import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet,  FlatList,ActivityIndicator, Dimensions,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header,Button} from 'react-native-elements';
import publicIP from 'react-native-public-ip';
const numColumns = 3;
const WIDTH = Dimensions.get('window').width

export const Profile = ({navigation,route}) =>{
    const [userData, setUserData] = useState([]);
    const [userVid, setVid] = useState([]);
    const signOut = async ()=>{
        const email = await AsyncStorage.removeItem("email");
        // console.log("email ",email);
        route.params.login(false);
    }
    // const [searchApi, results, errorMessage,isSearched,userData,getUserData,userVid] = useResults();
    const getUserData = async () => {
        let user_id = await AsyncStorage.getItem("user_id");
        publicIP().then(ip=>{
            fetch('http://185.237.96.39:3000/users/users?type=getprofile&&userip='+ip+'&&user_id='+user_id)
            .then(res=>res.json())
            .then((response)=>{
                console.log(response);
                setUserData(response.Response[0]);
                const data = []
               // data.push(userData.posts)
                data.push(response.posts)
                data.push(response.re_posts)
                setVid(data)
            })
        })
        // try{
        //     const response = await axios.get('http://185.237.96.39:3000/users/users?type=getprofile&&userip=10.10.255.155&&user_id=3');
        //     setUserData(response.data.Response[0]);
        //     const data = []
        //    // data.push(userData.posts)
        //     data.push(response.data.posts)
        //     data.push(response.data.re_posts)
        //     setVid(data)
        // } 
        // catch{
        //     console.log('Something went wrong')
        // }  
    };

    useEffect(() => {
        getUserData();
      }, []);

    return (
        <>
        <Header
            placement="left"
            containerStyle={{
                backgroundColor: '#181818',
                borderBottomWidth: 0,
                borderBottomColor: '#000',
            }}
            centerComponent={{ text: 'Profile', style: { color: '#fff',fontSize:20,borderBottomWidth:0 } }}
        />


        <View style={{height:'100%',width:'100%' ,  backgroundColor:'#000000'}}>
                <View style={style.itemStyle}>
                    <TouchableOpacity onPress={signOut}>
                        <View style={{width:100,height:40,background:'#000',margingLeft:15}}><Text style={{color:'white'}}>Sign out</Text></View>
                    </TouchableOpacity>
                    {/* <Button onPress={signOut} title="Sign out"  color='#000'/> */}

                    {userData.image?
                            (
                                <Image source={{uri:userData.image}} style={style.avatarStyle} />                   
                            ):
                            (
                                <View style={{width:40,height:40,borderRadius:50,justifyContent: 'center',alignItems: 'center',backgroundColor:'#242424'}}>
                                    <Ionicons name="person-outline" size={25} color={'#717171'}/>
                                </View>
                            )
                        }

                    
                </View>
                <View style={style.statContainer}>
                    <View>
                         <Text style={{fontSize:18,fontWeight:'bold',color:'#ffff',paddingBottom:15}}>{userData.username}</Text>
                         <Text style={{fontSize:15,color:'#ffff',paddingBottom:15}}>{userData.bio}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="musical-note-sharp" size={24} color="#ffff" style={{marginRight:20}} />
                        <Entypo name="location-pin" size={25} color="#eb8d35" />
                      <Text style={{color:'#ffff',paddingBottom:5}}></Text>
                    </View>
                    <View style={{flexDirection: 'row',marginTop:20}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{color:'#ffff',paddingBottom:5,fontWeight:'bold',paddingRight:30}}>Followers:</Text>
                            <Text style={{color:'#ffff',paddingBottom:15,paddingRight:30}}>{userData.followers}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{color:'#ffff',paddingBottom:5,fontWeight:'bold'}}>Following:</Text>
                            <Text style={{color:'#ffff',paddingBottom:15}}>{userData.following}</Text>
                        </View>
                    </View>
                    {/* <View style={{flexDirection: 'row'}}>
                        <Button  buttonStyle={style.buttonStyle} title='Follow' />
                        <MaterialIcons name="email" size={30} style={{paddingLeft:15}} color="#ffff" />
                    </View> */}
                </View>
                <View style={{flexDirection: 'row', marginTop:15,width:'90%',alignItems:'center',height:50, backgroundColor: '#181818',marginLeft:'5%',borderRadius:10,justifyContent:'center'}}>
                    <Text style={{fontSize:16,color:'#fff',alignSelf:'center',fontWeight:'bold', marginRight:20,marginTop:10}}>Videos</Text>
                    {/* <Text style={{fontSize:16,color:'#fff',fontWeight:'bold',marginLeft:40,marginTop:10}}>|</Text> */}
                    {/* <Text  style={{fontSize:16,color:'#fff',fontWeight:'bold',marginLeft:70,marginTop:10}}>Reposts</Text> */}
              </View>


            <FlatList
                keyExtractor={(result) => result.id}
                data = {userVid}
                numColumns={numColumns}
                renderItem={({item})=>{
                 
                     return(
                        <View style={{height:'auto',width:'100%',flexDirection:'row',flexWrap: 'wrap'}}>
                        <Image style={{width:'32%',height:120,marginLeft:2,resizeMode:'cover',marginTop:2}} source={{uri:item.post_file}}/>
                        {/* <Image style={{width:'32%',height:120,marginLeft:2,resizeMode:'cover',marginTop:2}} source={{uri:'https://cdn.jwplayer.com/v2/media/KgabHVkY/poster.jpg'}}/>
                        <Image style={{width:'32%',height:120,marginLeft:2,resizeMode:'cover',marginTop:2}} source={{uri:'https://cdn.jwplayer.com/v2/media/KgabHVkY/poster.jpg'}}/>
                        <Image style={{width:'32%',height:120,marginLeft:2,resizeMode:'cover',marginTop:2}} source={{uri:'https://cdn.jwplayer.com/v2/media/KgabHVkY/poster.jpg'}}/> */}
                    </View>
                     )  
                    
                }}
             />
            </View>

            {/* <FlatList
                keyExtractor={(result) => result.id}
                data = {userVid}
                numColumns={numColumns}
                renderItem={({item})=>{
                 
                     return(
                        <View style={style.itemstyle,{flexDirection: 'column',height:100}}>
                            <Image style={{width:120,height:120}} source={{uri:'https://cdn.jwplayer.com/v2/media/bkwJXMfz/poster.jpg'}}/>
                        </View>
                     )  
                    
                }}
             /> */}
        </>
    )
}

const style = StyleSheet.create({
    avatarStyle:{
        width:100,
        height:100, 
        borderRadius:50,
        marginLeft:20,
        marginTop:20,
        borderWidth:4,
        borderColor:'#fff',
        backgroundColor:'#717171'
    },
    itemStyle:{
        backgroundColor: '#181818',
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        height:120,
    },
    statContainer:{
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingTop:'15%',
        paddingLeft:20
    },
    buttonStyle:{
        width:70,
        height:30,
        alignSelf:'center',
        borderRadius:10,
        backgroundColor: "#eb8d35",
        marginRight:20
    },
    itemstyle:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height:WIDTH/3,
        width:((WIDTH/3)-2)
    }
   
})