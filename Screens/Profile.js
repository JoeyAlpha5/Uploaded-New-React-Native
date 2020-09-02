import React from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';

export const Profile = ({navigation,route}) =>{
    const signOut = async ()=>{
        const email = await AsyncStorage.removeItem("email");
        // console.log("email ",email);
        route.params.login(false);
    }

    return (
        <View style={{height:'100%', width:'100%',backgroundColor:'#000000'}}>
            <Text>Profile</Text>
            <Button title="Sign out" onPress={()=>signOut()}/>
        </View>
    )
}
