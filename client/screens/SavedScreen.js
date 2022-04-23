import { StyleSheet, Text, View, FlatList, Modal, Pressable, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';


export default function SavedScreen() {
  const [plantsList, setPlantsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantItem, setPlantItem] = useState({});

  const BASE_URL = 'https://6602-78-147-218-246.eu.ngrok.io';
  
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getPlants();
      return () => {
        isActive = false;
      };
    }, [])
  );

  async function getPlants() {
    const auth = getAuth();
      fetch(`${BASE_URL}/plants`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data : auth.currentUser.email})
      }).then(res => res.json())
        .then(result => {
          setPlantsList(result.data);
        })
        .catch(err => console.error('SAVED SCREEN NETWORK ERROR: ', err));
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
        <View style={styles.centeredView}>
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
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => removePlantFromList(plantItem._id)}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>

      <FlatList data={plantsList} renderItem={renderItem} keyExtractor={item => item._id}/>

    </View>
    
  )
}

const styles = StyleSheet.create({
  centeredView: {
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    color: '#2196F3',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20
  },
  description: {
    fontSize: 15
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    
  },
  buttonClose: {
    width: 100,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  container: {
    flex: 1
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 5
  },
  button: {  
    flexDirection: 'row',
    margin: 20,
    
  },
  text: {
    marginTop: 35,
    marginLeft: 15,
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  }
})