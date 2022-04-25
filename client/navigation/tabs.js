import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import savedIcon from '../assets/saved.png';
import settingsIcon from '../assets/settings.png';
import cameraIcon from '../assets/camera_icon.png';
import COLORS from '../theme.js';

const Tab = createBottomTabNavigator();


const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={
        {tabBarShowLabel: false, tabBarStyle: styles.navigatorStyle}
      }>
      <Tab.Screen name="Saved" component={SavedScreen} options={
        {
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={savedIcon} resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.focused : COLORS.unfocused
                }}
              />
              <Text style={{color: focused ? COLORS.focused : COLORS.unfocused, fontSize: 12}}>
                  Saved
              </Text>
            </View>
          )
        }

      }/>
      <Tab.Screen name="Camera" component={CameraScreen} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image source={cameraIcon} resizeMode = 'contain'
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? COLORS.focused: COLORS.unfocused
            }}/>
            <Text style={{color: focused ? COLORS.focused : COLORS.unfocused, fontSize: 12}}>
              Camera
            </Text>
            </View>
        ),
      }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={
        {
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={settingsIcon} resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.focused : COLORS.unfocused
                }}
              />
              <Text style={{color: focused ? COLORS.focused : COLORS.unfocused, fontSize: 12}}>
                  Settings
              </Text>
            </View>
          )
        }

      }/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  navigatorStyle : {
    position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'white',
            borderRadius: 15,
            height: 90,
            
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              elevation: 5
          
  }
  
})

export default Tabs;