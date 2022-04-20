import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import backgroundImageCover from './assets/login_background.jpg';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    // <View style={styles.container}>
    //   <Image source={backgroundImageCover} style={styles.image}/>
    //     <Text style={styles.text}>Plant Spotters</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }}name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'black',
    fontSize: 24,
    lineHeight: 84
  }
});
