import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Player from './Screens/Player';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PasswordReset from './Screens/PasswordReset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './Screens/NavigationStack';
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
  });

  if(LogedIn == false){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login}   initialParams={{ login: updateLogin }}
          options={{headerTintColor: '#ffffff', title:'Sign in', headerStyle: {
            backgroundColor: '#000000',
          }}}/>
          <Stack.Screen name="PasswordReset" component={PasswordReset}
          options={{headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#000000',
          }}}/>
          <Stack.Screen name="Register"  component={Register} initialParams={{ login: updateLogin }} options={{title:'Sign up',headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#000000',
          }}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return(
      <NavigationContainer>
          <Stack.Navigator>
                <Stack.Screen name="Uploaded" component={HomeTab} initialParams={{ login: updateLogin }}  options={{title:'Uploaded',headerTintColor: '#ffffff',headerStyle: {
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