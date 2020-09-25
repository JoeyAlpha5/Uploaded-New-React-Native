import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from 'react-native-elements';

export const Profile = ({navigation,route}) =>{
    const signOut = async ()=>{
        const email = await AsyncStorage.removeItem("email");
        // console.log("email ",email);
        route.params.login(false);
    }

    return (
        <View style={{height:'100%', width:'100%',backgroundColor:'#000000'}}>
            <Header
                placement="left"
                containerStyle={{
                    backgroundColor: '#181818',
                    borderBottomWidth: 0,
                    borderBottomColor: '#000',
                }}
                centerComponent={{ text: 'Profile', style: { color: '#fff',fontSize:20,borderBottomWidth:0 } }}
            />
            <Text>Profile</Text>
            <Button title="Sign out" onPress={()=>signOut()}/>
        </View>
    )
}
