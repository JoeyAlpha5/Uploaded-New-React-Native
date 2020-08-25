import React, {useState,useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feed from './Screens/Feed';
import Notifications from './Screens/Notifications';
import Player from './Screens/Player';
import Profile from './Screens/Profile';
import Search from './Screens/Search';

const App = ()=>{
  return(
      <View>
        <Feed/>
      </View>
  )
}

export default App