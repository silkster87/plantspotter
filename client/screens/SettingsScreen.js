import { Text, View, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import BASE_URL from '../baseUrl';
import styles from '../styleSheets/SettingsScreenStyle.js';


export default function SettingsScreen() {
  const[modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  }

  async function handleDeleteUser() {
    const user = auth.currentUser;

    //Remove user plant data from DB
    fetch(`${BASE_URL}/deleteUser`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data : user.email})
    }).then(res => res.json())
      .then(result => console.log(`${result.data.deletedCount} plant records removed from DB`));

    await deleteUser(user).then(() => {
      //User deleted.
      setModalVisible(!modalVisible);
      navigation.replace('Login');
    }).catch((error) => {
      console.error('ERROR DELETING USER: ', error);
    })
  }

  return (
    <View style = {styles.container}>
      <Modal
        style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete account? This will also remove your plant records.
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.buttonModal, styles.buttonModalClose]}
                  onPress={handleDeleteUser}
                  >
                <Text style = {styles.textStyle}>Confirm</Text>  
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonModalClose, styles.button2]}
                  onPress={() => setModalVisible(!modalVisible)}
                  >
                <Text style = {styles.textStyle}>Cancel</Text>  
                </Pressable>
              </View>
              
            </View>
          </View>
      </Modal>
      <Text style = {styles.text}>Logged in as {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.deleteButton}
      >
        <Text style={styles.buttonText}>Delete account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      
    </View>
  )
}