import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import Player from './Screens/Player';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import PasswordReset from './Screens/PasswordReset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './Screens/NavigationStack';

const Stack = createStackNavigator();
const App = ()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login}
          options={{headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#ff9800',
          }}}/>
          <Stack.Screen name="PasswordReset" component={PasswordReset}
          options={{headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#ff9800',
          }}}/>
        <Stack.Screen name="Uploaded" component={HomeTab} options={{headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#131313',
          }}}/>
        <Stack.Screen name="Player" component={Player} options={{headerTintColor: '#ffffff',headerStyle: {
            backgroundColor: '#131313',
          }}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App