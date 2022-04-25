import { StyleSheet, TextInput, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import image from '../assets/login_background.jpg';
import SvgPlantLogo from '../assets/loginPlantIcon.js';

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