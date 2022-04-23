import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable, Modal, Image, ActivityIndicator } from 'react-native'
import React , { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera';
import { readAsStringAsync } from 'expo-file-system';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import cameraIcon from '../assets/camera_icon.png';
import uploadIcon from '../assets/upload.png';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import BASE_URL from '../baseUrl';

function CameraScreen(props) {

  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [plantImageUrl, setPlantImageUrl] = useState('');
  const [plantApiResult, setPlantApiResult] = useState({});
  const [loggedUserEmail, setLoggedUserEmail] = useState(null);
  const [isFocusedCam, setIsFocusedCam] = useState(true);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user){
          setLoggedUserEmail(user.email);
        }
      });

    })();
  }, []);

  if (hasPermission === null) return <View/>;
  if (hasPermission === false) return <Text>No access to camera</Text>

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          quality: 0.5,
          aspect:[4,3]
        });
        return photo;
      } catch (error) {
        console.error(error);
      }
    }
  }

  const identifyPlantFromPhoto = async () => {
    const r = await takePhoto();
        
    
    MediaLibrary.saveToLibraryAsync(r.uri);

    fetchPlantDetailsFromAPI(r.uri);
    // await readAsStringAsync(r.uri, {encoding: 'base64'})
    //   .then((response) => {
    //     result = response;
    //   })
    //   .catch((error) => console.error('ERROR READING STRING: ', error.message));

    // fetch(`${BASE_URL}/plantLookUp`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({'data' : result})
    //   }).then(res => res.json())
    //     .then(result => {
    //       console.log('PLANT API DATA', result.data);
    //       setPlantApiResult(result.data);
    //       setPlantName(result.data.suggestions[0].plant_name);
    //       setPlantImageUrl(result.data.images[0].url);
    //       setModalVisible(true);
    //     })
    //     .catch(error => Alert.alert('ERROR IN PLANT LOOK UP', error.message));
  }

  const fetchPlantDetailsFromAPI = async (uri) => {

    let result = null;

    await readAsStringAsync(uri, {encoding: 'base64'})
      .then((response) => {
        result = response;
      })
      .catch((error) => console.error('ERROR READING STRING: ', error.message));

    fetch(`${BASE_URL}/plantLookUp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'data' : result})
      }).then(res => res.json())
        .then(result => {
          console.log('PLANT API DATA', result.data);
          setPlantApiResult(result.data);
          setPlantName(result.data.suggestions[0].plant_name);
          setPlantImageUrl(result.data.images[0].url);
          setModalVisible(true);
        })
        .catch(error => Alert.alert('ERROR IN PLANT LOOK UP', error.message));
  }


  const saveIdentifiedPlantToDB = async () => {
    
    const plantItemToDB = {
      userEmail: loggedUserEmail,
      title: plantName,
      description: plantApiResult.suggestions[0].plant_details.wiki_description.value,
      imageUrl: plantApiResult.images[0].url,
      plantInfoUrl: plantApiResult.suggestions[0].plant_details.url
    }

    fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ data : plantItemToDB})
    }).then(res => res.json())
      .then(result => {
        console.log('Saved', result.data.title);
      })
      .catch(error => console.error('ERROR SAVING REQUEST: ' , error))

     setModalVisible(!modalVisible);
  }

  const pickImage = async () => {
    setIsFocusedCam(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5
    });

    setIsFocusedCam(true);
    // console.log('IMAGE PICKED FROM USER: ', result);
    // Alert.alert('Image picked: ', result.uri);
    fetchPlantDetailsFromAPI(result.uri);
  }

 
  
if (isFocusedCam) {
  return (
    
    <View style={styles.container}>

       <Modal
         style={styles.centeredView}
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
           setModalVisible(!modalVisible);
         }}
         >
         <View style={styles.centeredView}>
           <View style={styles.modalView}>
             <Image
               style={styles.modalImage}
               source={{uri: plantImageUrl}}
             ></Image>
             <Text style={styles.modalText}>
               The plant name is {plantName}
             </Text>
             <View style={styles.buttonView}>
               <Pressable
                 style={[styles.buttonModal, styles.buttonModalClose]}
                 onPress={saveIdentifiedPlantToDB}
               >
                 <Text style = {styles.textStyle}>Save</Text>
               </Pressable>
               <Pressable
                 style={[styles.buttonModal, styles.buttonModalClose]}
                 onPress={() => setModalVisible(!modalVisible)}
               >
                 <Text style = {styles.textStyle}>Cancel</Text>
               </Pressable>
             </View>
           </View>
         </View>
       </Modal>
      { isFocused && <Camera style={styles.camera} type={type} ref={cameraRef}>
       <View style={styles.buttonContainer}>
         
         <TouchableOpacity style={styles.button} 
           onPress={identifyPlantFromPhoto}>
           <Image 
             source={cameraIcon}
             resizeMode = 'contain'
             style = {styles.cameraIcon}
           />
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} 
           onPress={pickImage}>
           <Image 
             source={uploadIcon}
             resizeMode = 'contain'
             style = {styles.cameraIcon}
           />
         </TouchableOpacity>
       </View>
     </Camera> }
     
   </View> 
 );
} else {
  return <></>
}
  
}

export default CameraScreen;

const styles = StyleSheet.create({
  cameraIcon: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalImage: {
    width: 220,
    height: 220,
    resizeMode: 'cover',
    marginBottom: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingBottom : 150,
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#097F0C',
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
})