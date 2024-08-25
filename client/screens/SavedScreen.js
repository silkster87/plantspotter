import {  Text, View, FlatList, Modal, Pressable, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import screenshotCamera from '../assets/screenshot_camera.jpg';
import screenshotPhotoPlant from '../assets/screenshot_photoplant.jpg';
import styles from '../styleSheets/SavedScreenStyle';
import BASE_URL from '../baseUrl';

export default function SavedScreen() {
  const [plantsList, setPlantsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantItem, setPlantItem] = useState({});
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  //This is used to perform the getPlants again when navigating back to this screen
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getPlants(isActive);
      return () => {
        isActive = false;
      };
    }, [])
  );

  async function getPlants(isActive) {
    const auth = getAuth();
      fetch(`${BASE_URL}/plants`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data : auth.currentUser.email})
      }).then(res => res.json())
        .then(result => {
          if (isActive) setPlantsList(result.data);
        })
        .catch(err => {
          setErrorMsg(`Error in network request: ${err}`);
          setErrorModal(true);
        });
  }


  function showPlantDetails(id) {
    setPlantItem(plantsList.find(plant => plant._id == id));
    setModalVisible(true);
  }

  async function removePlantFromList(id) {
    console.log('Plant ID to remove: ', id);
    await fetch(`${BASE_URL}/plantItem/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(result => {
        console.log('Item deleted: ', result);
        setPlantsList( currPlants => {
          return currPlants.filter( plant => plant._id !== id);
        } );
      })
    setModalVisible(!modalVisible);
  }

  const renderItem = ({ item }) => <TouchableOpacity 
                                        style={styles.button} 
                                        key={item._id} 
                                        onPress={() => showPlantDetails(item._id)}
                                    >
                                    <Image style={styles.image} source={{uri: item.imageUrl}}></Image>
                                    <Text style={styles.text}>{item.title}</Text>
                                    </TouchableOpacity>

  return (
    
    <View style = {styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.modalImage}
              source={{uri: plantItem.imageUrl}}
            ></Image>
            <Text style={styles.modalText} onPress={() => Linking.openURL(plantItem.plantInfoUrl)}>{plantItem.title}</Text>
            <Text style={styles.description}>{plantItem.description}</Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.button2]}
                onPress={() => removePlantFromList(plantItem._id)}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Modal
        animationType='slide'
        transparent
        visible={errorModal}
        onRequestClose={() => {
          setErrorMsg('');
          setErrorModal(false);
        }}
      >
        <View style={{ ...styles.centeredView, justifyContent: 'center' }}>
          <View style={styles.modalView}>
            <Text>
              {errorMsg}
            </Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setErrorMsg('');
                  setErrorModal(false);
                }}>
                  <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {plantsList.length > 0 && 
      <FlatList data={plantsList} renderItem={renderItem} keyExtractor={item => item._id}/>
      }
      {plantsList.length == 0 && 
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.textNoSavedPlants}>You have no saved plants.</Text>
          <Image style={styles.screenshotImage} source={screenshotCamera}></Image>
        <Text style={styles.textNoSavedPlants}>Click on the Camera Icon to take picture or upload a plant.</Text>
          <Image style={styles.screenshotPlant} source={screenshotPhotoPlant}></Image>
        <Text style={styles.textNoSavedPlants}>Once identified you will have the option of saving or discarding the result.</Text>
      </ScrollView>
      }
    </View>
  )
}
