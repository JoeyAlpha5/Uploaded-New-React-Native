import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feed } from './Feed';
import { Search } from './Search';
import { Profile } from './Profile';
import { Notifications } from './Notifications';
import { Player } from './Player';

//page stacks
const homeStack = createStackNavigator();
const searchStack = createStackNavigator();
const notificationStack = createStackNavigator();
const profileStack = createStackNavigator();
const postStack = createStackNavigator();

//stack content
export const homeStackScreen =() => {
  return(
    <homeStack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#131313',shadowOpacity:0 },
    }}>
      <homeStack.Screen name="Home" component={Feed}/>
      <homeStack.Screen name="Player" component={Player}/>
    </homeStack.Navigator>
  );
};
export const searchStackScreen =() => {
  return(
  <searchStack.Navigator screenOptions={{
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#131313' },
  }}>
      <searchStack.Screen name="search" component={Search}/>
  </searchStack.Navigator>
  )
};
export const notificationStackScreen =() => {
  return(
    <notificationStack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#131313' },
    }}>
      <notificationStack.Screen name="notifications" component={Notifications}/>
    </notificationStack.Navigator>
  )
};
export const profileStackScreen =() => {
  return (
    <profileStack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#131313' },
    }}>
      <profileStack.Screen name="profile" component={Profile}/>
    </profileStack.Navigator>
  )
};