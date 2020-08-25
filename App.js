import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feed from './Screens/Feed';
import Notifications from './Screens/Notifications';
import Player from './Screens/Player';
import Profile from './Screens/Profile';
import Search from './Screens/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {homeStackScreen,searchStackScreen,notificationStackScreen,profileStackScreen} from './Screens/NavigationStack';

const Tab = createBottomTabNavigator();
const App = ()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home': 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            }else if(route.name === 'Notifications'){
              iconName = focused ? 'notifications' : 'notifications-outline';
            }else if(route.name === 'Profile'){
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ff9800',
          inactiveTintColor: 'gray',
          style:{backgroundColor:'#131313'}
        }}
        >
        <Tab.Screen name="Home" component={homeStackScreen} />
        <Tab.Screen name="Search" component={searchStackScreen} />
        <Tab.Screen name="Notifications" component={notificationStackScreen} />
        <Tab.Screen name="Profile" component={profileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App