import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SvgPlantLogo from './assets/plantIcon.js';


const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}}name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Plant Spotter" 
          options={options} 
          component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const options = {
  headerStyle: {
    backgroundColor: '#097F0C',
  },
  headerTintColor: '#fff',
  headterTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => (
    <View style={styles.logoView}>
      <SvgPlantLogo />
    </View>
    
  ),
  
};

const styles = StyleSheet.create({
  logoView: {
    width: 48,
    height: 48,
    marginTop: 10,
  }
})

