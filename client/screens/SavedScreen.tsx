import {  Text, View, FlatList, Modal, Pressable, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, type Auth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../styleSheets/SavedScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IPlantRecord } from '../interfaces';

export default function SavedScreen() {
  const ALPHABETICAL_ASC = 'Alphabetical (A-Z)';
  const ALPHABETICAL_DESC = 'Alphabetical (Z-A)';
  const DATE_ASC = 'Date (oldest first)';
  const DATE_DESC = 'Date (recent first)';
  const STORAGE_KEY = 'storage_key';
  const [plantsList, setPlantsList] = useState<IPlantRecord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantItem, setPlantItem] = useState<IPlantRecord>();
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(DATE_DESC);
  const auth: Auth = getAuth();
  

  const sortOptions = [DATE_DESC, DATE_ASC, ALPHABETICAL_ASC, ALPHABETICAL_DESC];
  
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

  const sortPlantsList = (sortType: string, plantsList: IPlantRecord[]): void => {
    if (sortType === ALPHABETICAL_ASC) {
      const newData = [ ...plantsList ].sort((a, b) => {
        const textA = a.title.toLocaleUpperCase();
        const textB = b.title.toLocaleUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      setPlantsList(newData);
    }

    if (sortType === ALPHABETICAL_DESC) {
      const newData = [ ...plantsList ].sort((a, b) => {
        const textA = a.title.toLocaleUpperCase();
        const textB = b.title.toLocaleUpperCase();
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      });

      setPlantsList(newData);
    }
    
    if (sortType === DATE_ASC) {
      // Sort by Date oldest first
      const newData = [ ...plantsList ].sort((a, b) => {
      const timeA = new Date(a.dateTime);
      const timeB = new Date(b.dateTime);
      return (timeA.valueOf() < timeB.valueOf()) ? -1 : (timeA.valueOf() > timeB.valueOf()) ? 1 : 0;
      });

      setPlantsList(newData);
    }

    if (sortType === DATE_DESC) {
      // Sort by Date newest first
      const newData = [ ...plantsList ].sort((a, b) => {
      const timeA = new Date(a.dateTime);
      const timeB = new Date(b.dateTime);
      return (timeA.valueOf() < timeB.valueOf()) ? 1 : (timeA.valueOf() > timeB.valueOf()) ? -1 : 0;
      });

      setPlantsList(newData);
    }
  };

  async function getPlants(isActive: boolean) {
    try {
      const q = query(collection(db, 'plant-records'), where('userEmail', '==', auth?.currentUser?.email));
      const querySnapshot = await getDocs(q);
      if (isActive) {
        const data: IPlantRecord[] = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as IPlantRecord)
        });
        const savedSortByValue = await AsyncStorage.getItem(STORAGE_KEY) || DATE_DESC;
        sortPlantsList(savedSortByValue, data);
        setSortBy(savedSortByValue);
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
      <View style={{ flexDirection: 'column', gap: 8 }}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={{ marginLeft: 15}}>{new Date(item.dateTime).toUTCString()}</Text>
      </View> 
    </TouchableOpacity>

  return (
    
    <View style={styles.container}>
      <View style={{ ...styles.buttonsContainer, ...styles.sortViewContainer}}>
        <Text style={styles.dropdownButtonTxtStyle}>Sort by: </Text>
        <SelectDropdown
          data={sortOptions}
          onSelect={async (selectedItem) => {
            setSortBy(selectedItem);
            sortPlantsList(selectedItem, plantsList);
            await AsyncStorage.setItem(STORAGE_KEY, selectedItem);
          }}
          renderButton={(_) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownItemTxtStyle}>{sortBy}</Text>
              </View>
            )
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            );
          }}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
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
