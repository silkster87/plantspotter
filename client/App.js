import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }}name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="Plant Spotter" 
          options={{
            headerStyle: {
              backgroundColor: '#097F0C',
            },
            headerTintColor: '#fff',
            headterTitleStyle: {
              fontWeight: 'bold',
            }
          }} 
          component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

