import { TextInput, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import image from '../assets/login_background.jpg';
import SvgPlantLogo from '../assets/loginPlantIcon.js';
import styles from '../styleSheets/LoginScreenStyle';

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


  return (
    <View
      style={styles.container}
    >
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <View style={styles.svgContainer}>
          <SvgPlantLogo/>
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

export default LoginScreen;
