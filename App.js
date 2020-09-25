import 'react-native-gesture-handler';
import React, {useState,useEffect, Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Image,View} from 'react-native';
import Player from './Screens/Player';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PasswordReset from './Screens/PasswordReset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './Screens/NavigationStack';
import OneSignal from 'react-native-onesignal';
const App = ()=>{
  const [LogedIn, setLogedIn] = useState(true);
  const Stack = createStackNavigator();
  const isLoggedIn = async ()=>{
    const email = await AsyncStorage.getItem("email");
    console.log(email," that's the email");
    if(email === null || email === undefined){
      setLogedIn(false);
    }else{
      setLogedIn(true);
      console.log("saved email ",email);
    }
  }
  const updateLogin = (isLoggedIn, email) =>{
      setLogedIn(isLoggedIn);
      console.log("login state updated to ",isLoggedIn, " email ", email);
  }
  useEffect(()=>{
    var savedEmail = isLoggedIn();
    PushService();
  });

  const PushService = ()=>{
    console.log("push service");
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("6546b42c-4cb3-46c1-bb7f-e046448eee31", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
  }

  //when push notification are opened
  const onOpened = (openResult)=>{
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  //getting the device id
  const onIds = async (device_id_info) =>{
    console.log("device id info ", device_id_info.userId);
    await AsyncStorage.setItem("device_id", device_id_info.userId);
  }

  if(LogedIn == false){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login}   initialParams={{ login: updateLogin }}
          options={{headerTintColor: '#ffffff', headerTitle:()=>(            
                <Image
                style={{ width: 30, height: 30 }}
                source={require('./assets/logo.png')}
                resizeMode='contain'
              />
          ), 
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#000000',
          }}}/>
          <Stack.Screen name="PasswordReset" component={PasswordReset}
          options={{headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#000000',
          }}}/>
          <Stack.Screen name="Register"  component={Register} initialParams={{ login: updateLogin }} options={{headerTintColor: '#ffffff',
            headerTitle:()=>(            
              <Image
              style={{ width: 30, height: 30 }}
              source={require('./assets/logo.png')}
              resizeMode='contain'
            />
        ), 
        headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#000000',
          }}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return(
      <NavigationContainer>
          <Stack.Navigator>
                <Stack.Screen name="Uploaded" component={HomeTab}  initialParams={{ login: updateLogin }}  options={{title:'Uploaded',headerTintColor: '#ffffff',headerShown:false,headerStyle: {
                  backgroundColor: '#131313',
                }}}/>
                <Stack.Screen name="Player" component={Player} screenOptions={{headerShown:false}} options={{headerShown:false,title:'View post',headerTintColor: '#ffffff',headerStyle: {
                  backgroundColor: '#131313',
                }}}/>
          </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App