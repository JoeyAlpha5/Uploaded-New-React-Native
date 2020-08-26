import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feed } from './Feed';
import { Search } from './Search';
import { Profile } from './Profile';
import { Notifications } from './Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Player } from './Player';


//page stacks
const Tab = createBottomTabNavigator();

const HomeTab = ()=>{
  return(
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
      <Tab.Screen name="Home" component={Feed}/>
      <Tab.Screen name="Search" component={Search}/>
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}
export default HomeTab