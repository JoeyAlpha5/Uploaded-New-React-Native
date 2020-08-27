import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import Player from './Screens/Player';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PasswordReset from './Screens/PasswordReset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './Screens/NavigationStack';
const App = ()=>{
  const [LogedIn, setLogedIn] = useState();
  const Stack = createStackNavigator();
  const isLoggedIn = async ()=>{
    return AsyncStorage.getItem("email");
  }
  const updateLogin = (isLoggedIn, email) =>{
      setLogedIn(isLoggedIn);
      console.log("login state updated to ",isLoggedIn, " email ", email);
  }
  useEffect(()=>{
    var savedEmail = isLoggedIn;
    if(savedEmail !== null){
      setLogedIn(true);
    }else{
      setLogedIn(false);
    }
  });
  return(
    <NavigationContainer>
        {
          LogedIn !== false && LogedIn !== null ? (
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
              <Stack.Screen name="Login" component={Login}  initialParams={{ login: updateLogin }}
              options={{headerTintColor: '#ffffff', title:'Sign in', headerStyle: {
                backgroundColor: '#000000',
              }}}/>
              <Stack.Screen name="PasswordReset" component={PasswordReset}
              options={{headerTintColor: '#ffffff',headerStyle: {
                backgroundColor: '#000000',
              }}}/>
            <Stack.Screen name="Register" component={Register} options={{title:'Sign up',headerTintColor: '#ffffff',headerStyle: {
                backgroundColor: '#000000',
              }}}/>

                <Stack.Screen name="Uploaded" component={HomeTab} options={{title:'Home',headerTintColor: '#ffffff',headerStyle: {
                  backgroundColor: '#131313',
                }}}/>
                <Stack.Screen name="Player" component={Player} options={{title:'View post',headerTintColor: '#ffffff',headerStyle: {
                  backgroundColor: '#131313',
                }}}/>
            </Stack.Navigator>
            )
              :
              (
              <Stack.Navigator>
                <Stack.Screen name="Uploaded" component={HomeTab} options={{title:'Home',headerTintColor: '#ffffff',headerStyle: {
                  backgroundColor: '#131313',
                }}}/>
                <Stack.Screen name="Player" component={Player} options={{title:'View post',headerTintColor: '#ffffff',headerStyle: {
                  backgroundColor: '#131313',
                }}}/>
            </Stack.Navigator>)
        }
    </NavigationContainer>
  )
}

export default App