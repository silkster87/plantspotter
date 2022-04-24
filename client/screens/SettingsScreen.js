import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import BASE_URL from '../baseUrl';


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

const styles = StyleSheet.create({
  centredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 100
  },
  buttonModalClose: {
    backgroundColor: '#2196F3',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#097F0C',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  }, 
  deleteButton: {
    backgroundColor: '#e32f45',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
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
    fontSize: 20
  },
  button2: {
    backgroundColor: '#e32f45'
  }
})