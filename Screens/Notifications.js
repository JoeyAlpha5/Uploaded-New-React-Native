import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
export const Notifications = () =>{
    const [notificationsArray, setNotificationsArray] = useState([]);
    const getNotifications = ()=>{

    }
    useEffect(()=>{
        getNotifications();
    })

    return (
        <View style={{height:'100%', width:'100%',backgroundColor:'#000000',justifyContent: 'center',alignItems: 'center',}}>
           <Text style={{color:'#717171'}}>Coming soon</Text>
        </View>
    )
}
// export default Notifications