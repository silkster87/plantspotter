import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import savedIcon from '../assets/saved.png';
import settingsIcon from '../assets/settings.png';
import cameraIcon from '../assets/camera_icon.png';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity style={{
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    ...styles.shadow

  }} onPress={onPress}>
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#097F0C'
    }}>
      {children}
    </View>
  </TouchableOpacity>
)


const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={
        {
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 90,
            ...styles.shadow
          }
        }
      }>
      <Tab.Screen name="Saved" component={SavedScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={savedIcon}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45': '#748c94'
                }}
              />
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                  Saved
              </Text>
            </View>
          )
        }

      }/>
      <Tab.Screen name="Camera" component={CameraScreen} options={{
        tabBarIcon: ({focused}) => (
          <Image
            source={cameraIcon}
            resizeMode = 'contain'
            style={{
              width: 30,
              height: 30,
              tintColor: 'white'
            }}/>
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} />
        )
      }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={
        {
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={settingsIcon}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45': '#748c94'
                }}
              />
              <Text
                style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
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
  shadow: {
    shadowColor: '#097F0C',
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