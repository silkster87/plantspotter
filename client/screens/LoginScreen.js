import { KeyboardAvoidingView, StyleSheet, TextInput, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import image from '../assets/login_background.jpg';
import Svg, { Path } from 'react-native-svg';

const validator = require('validator');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, user =>{
      if (user) {
        navigation.replace("Plant Spotter");
      }
    })

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (!validator.isEmail(email)) {
      alert('Please enter valid email address');
      return;
    }
    if (validator.isEmpty(password)) {
      alert('Please enter password.');
      return;
    }
    if (!validator.isLength(password, {min: 8})) {
      alert('Password must be at least 8 characters long');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with: ', user.email);
    })
    .catch(err => alert(err.message));
  }

  const handleLogin = () => {
    if (!validator.isEmail(email)) {
      alert('Please enter valid email address');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with: ', user.email);
    })
    .catch(err => alert(err.message));
  }

  const Logo = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" height='150' width='150' viewBox="0 0 100 100" stroke="white" fill="#097F0C"><Path d="M24 39Q28.85 39 32.325 35.525Q35.8 32.05 35.8 27.2Q30.95 27.2 27.475 30.675Q24 34.15 24 39ZM24 39Q24 34.15 20.525 30.675Q17.05 27.2 12.2 27.2Q12.2 32.05 15.675 35.525Q19.15 39 24 39ZM24 28Q25.35 28 26.175 27.175Q27 26.35 27 25V24.6Q27.4 24.95 27.9 25.05Q28.4 25.15 28.85 25.15Q30.2 25.15 31.025 24.325Q31.85 23.5 31.85 22.15Q31.85 21.15 31.4 20.5Q30.95 19.85 30.2 19.3Q30.95 19 31.4 18.225Q31.85 17.45 31.85 16.45Q31.85 15.1 31.025 14.275Q30.2 13.45 28.85 13.45Q28.4 13.45 27.9 13.55Q27.4 13.65 27 14V13.6Q27 12.25 26.175 11.425Q25.35 10.6 24 10.6Q22.65 10.6 21.825 11.425Q21 12.25 21 13.6V14Q20.6 13.65 20.1 13.55Q19.6 13.45 19.15 13.45Q17.8 13.45 16.975 14.275Q16.15 15.1 16.15 16.45Q16.15 17.45 16.575 18.125Q17 18.8 17.8 19.3Q17 19.65 16.575 20.4Q16.15 21.15 16.15 22.15Q16.15 23.5 16.975 24.325Q17.8 25.15 19.15 25.15Q19.6 25.15 20.125 25.05Q20.65 24.95 21 24.6V25Q21 26.35 21.825 27.175Q22.65 28 24 28ZM24 23.2Q22.35 23.2 21.225 22.075Q20.1 20.95 20.1 19.3Q20.1 17.65 21.225 16.525Q22.35 15.4 24 15.4Q25.65 15.4 26.775 16.525Q27.9 17.65 27.9 19.3Q27.9 20.95 26.775 22.075Q25.65 23.2 24 23.2ZM7 44Q5.8 44 4.9 43.1Q4 42.2 4 41V7Q4 5.8 4.9 4.9Q5.8 4 7 4H41Q42.2 4 43.1 4.9Q44 5.8 44 7V41Q44 42.2 43.1 43.1Q42.2 44 41 44ZM7 41H41Q41 41 41 41Q41 41 41 41V7Q41 7 41 7Q41 7 41 7H7Q7 7 7 7Q7 7 7 7V41Q7 41 7 41Q7 41 7 41ZM7 41Q7 41 7 41Q7 41 7 41V7Q7 7 7 7Q7 7 7 7Q7 7 7 7Q7 7 7 7V41Q7 41 7 41Q7 41 7 41Z"/></Svg>
  );

  return (
    <View
      style={styles.container}
    >
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <View style={styles.svgContainer}>
          <Logo />
        </View>

      <View style={styles.inputContainer} >
      
        <Text style={styles.title}>Plant Spotter</Text>
        <TextInput
          placeholder="Email"
          value= {email}
          onChangeText= {text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
        placeholder="Password"
        value= {password}
        onChangeText= {password => setPassword(password)}
        style={styles.input}
        secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}  
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}  
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  svgContainer: {
    width: 75,
    height: 75,
    marginBottom: 20,
  },  
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },  
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: '#097F0C',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  }, 
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#097F0C',
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutlineText: {
    color: '#097F0C',
    fontWeight: '700',
    fontSize: 16
  }

})