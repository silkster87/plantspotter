import {  Text, View, FlatList, Modal, Pressable, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { getAuth, type Auth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';
import screenshotCamera from '../assets/screenshot_camera.jpg';
import screenshotPhotoPlant from '../assets/screenshot_photoplant.jpg';
import styles from '../styleSheets/SavedScreenStyle';
import { IPlantRecord } from '../interfaces';

export default function SavedScreen() {
  const [plantsList, setPlantsList] = useState<IPlantRecord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantItem, setPlantItem] = useState<IPlantRecord>();
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const auth: Auth = getAuth();
  
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

  async function getPlants(isActive: boolean) {
    try {
      const q = query(collection(db, 'plant-records'), where('userEmail', '==', auth?.currentUser?.email));
      const querySnapshot = await getDocs(q);
      if (isActive) {
        const data: IPlantRecord[] = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as IPlantRecord)
        })
        setPlantsList(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(`Error fetching saved plants: ${error.message}`);
      } else {
        setErrorMsg(`Error fetching saved plants`);
      }
        
      setErrorModal(true);
    }
  }


  function showPlantDetails(id: string) {
    setPlantItem(plantsList?.find(plant => plant.id == id) as IPlantRecord);
    setModalVisible(true);
  }

  async function removePlantFromList(id: string) {
    try {
      await deleteDoc(doc(db, 'plant-records', id));
      setPlantsList( currPlants => {
        return currPlants.filter(plant => plant.id !== id);
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(`Error removing plant from list: ${error.message}`);
      } else {
        setErrorMsg('Error removing plant from list.');
      }
      
      setErrorModal(true);
    }
    setModalVisible(!modalVisible);
  }

  const renderItem = ({ item }: { item: IPlantRecord }) =>
    <TouchableOpacity 
      style={styles.button} 
      key={item.id} 
      onPress={() => showPlantDetails(item.id)}
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
              source={{uri: plantItem?.imageUrl}}
            ></Image>
            <Text
              style={styles.modalText}
              onPress={() => {
                if (plantItem?.plantInfoUrl)
                  Linking.openURL(plantItem?.plantInfoUrl);}}>
                {plantItem?.title}
            </Text>
            <Text style={styles.description}>{plantItem?.description}</Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.button2]}
                onPress={() => {
                  if (plantItem?.id)
                    removePlantFromList(plantItem?.id);
                }}
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
      <FlatList data={plantsList} renderItem={renderItem} keyExtractor={item => item.id}/>
      }
      {plantsList.length == 0 && 
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.textNoSavedPlants}>You have no saved plants.</Text>
          <Image style={styles.screenshotImage} source={require('../assets/screenshot_camera.jpg')}></Image>
        <Text style={styles.textNoSavedPlants}>Click on the Camera Icon to take picture or upload a plant.</Text>
          <Image style={styles.screenshotPlant} source={require('../assets/screenshot_photoplant.jpg')}></Image>
        <Text style={styles.textNoSavedPlants}>Once identified you will have the option of saving or discarding the result.</Text>
      </ScrollView>
      }
    </View>
  )
}
