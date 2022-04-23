import React from 'react';
import Tabs from '../navigation/tabs';
import { StatusBar } from 'react-native';

const HomeScreen = () => {
//This is the home screen with the heading 'Plant Spotter' It has navigation tabs allowing user
//to see saved plants, take/upload photo of plant to identify, see settings to sign out.
  
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#097F0C'></StatusBar>
      <Tabs/>
    </>
  )
}

export default HomeScreen

