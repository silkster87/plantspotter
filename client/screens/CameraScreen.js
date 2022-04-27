import { Text, View, TouchableOpacity, Alert, Pressable, Modal, Image, ActivityIndicator, AppState } from 'react-native'
import React , { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera';
import { readAsStringAsync } from 'expo-file-system';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import cameraIcon from '../assets/camera_icon.png';
import uploadIcon from '../assets/upload.png';
import styles from '../styleSheets/CameraScreenStyle.js';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../theme.js';

import BASE_URL from '../baseUrl';

function CameraScreen( {navigation} ) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [plantImageUrl, setPlantImageUrl] = useState('');
  const [plantApiResult, setPlantApiResult] = useState({});
  const [loggedUserEmail, setLoggedUserEmail] = useState(null);
  const [isFocusedCam, setIsFocusedCam] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  

  useEffect(() => {
    (async () => {
      AppState.addEventListener('change', _handleAppStateChange);

      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user){
          setLoggedUserEmail(user.email);
        }
      });

      return () => {
        AppState.remove('change', _handleAppStateChange);
      }
      
    })();
  }, []);

  const _handleAppStateChange = nextAppState => {
    // if (appState.current.match(/inactive|background/)) {
    //   navigation.navigate('Saved');
    // }
    // appState.current = nextAppState;
    
    //FIX ME - if the user uses the camera and then turns phone/app off and on again
    //you get an error similar to: https://stackoverflow.com/questions/71247918/parameter-specified-as-non-null-is-null-method-kotlin-o0-d-t-e
    //This is kind of a workaround by navigating to the 'Saved' screen but expected
    //behaviour is to return back to the Camera Screen.
    navigation.navigate('Saved');    
    
  };

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
  }

  const fetchPlantDetailsFromAPI = async (uri) => {
    setIsWaiting(!isWaiting);
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
          //console.log('PLANT API DATA', result.data);
          setPlantApiResult(result.data);
          setPlantName(result.data.suggestions[0].plant_name);
          setPlantImageUrl(result.data.images[0].url);
          setIsWaiting(!isWaiting);
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

      setIsWaiting(!isWaiting);
      setModalVisible(!modalVisible);
  }

  const pickImage = async () => {
    setIsFocusedCam(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5
    }).catch(err => { 
      console.error('ERROR PICK IMAGE: ', err); 
      return;
    });
    setIsFocusedCam(true);
    if (result.cancelled) return;
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
                 style={[styles.buttonModal, styles.buttonModalCloseCancel]}
                 onPress={() => {
                  setIsWaiting(!isWaiting); 
                  setModalVisible(!modalVisible)}}
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
         <ActivityIndicator animating={isWaiting} size= { 75 } color = {COLORS.focused} />
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
