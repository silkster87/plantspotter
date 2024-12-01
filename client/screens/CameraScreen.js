import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  ActivityIndicator } from 'react-native';
import React , { useEffect, useFocusEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { readAsStringAsync } from 'expo-file-system';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import { useIsFocused } from '@react-navigation/native';
import cameraIcon from '../assets/camera_icon.png';
import uploadIcon from '../assets/upload.png';
import styles from '../styleSheets/CameraScreenStyle.js';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../theme.js';

function CameraScreen( {navigation} ) {

  // const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [plantImageUrl, setPlantImageUrl] = useState('');
  const [plantApiResult, setPlantApiResult] = useState({});
  const [plantDateTime, setPlantDateTime] = useState('');
  const [isFocusedCam, setIsFocusedCam] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();
  const functions = getFunctions();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setErrorModal(true);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })()
  });

  if (!permission) return <View />

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    ); 
  }


  // const _handleAppStateChange = _nextAppState => {
  //   navigation.navigate('Saved');    
  // };

  

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
        setErrorMsg(error.message);
        setErrorModal(true);
      }
    }
  }

  const identifyPlantFromPhoto = async () => {
    const r = await takePhoto();
    if (permissionResponse.status !== 'granted') {
      await requestPermissionMedia();
    }
    MediaLibrary.saveToLibraryAsync(r.uri);
    fetchPlantDetailsFromAPI(r.uri);
  }
 
  const fetchPlantDetailsFromAPI = async (uri) => {
    setIsWaiting(true);
    let result = null;

    await readAsStringAsync(uri, {encoding: 'base64'})
      .then((response) => {
        result = response;
      })
      .catch((error) => {
        setErrorMsg(`Error reading string: ${error.message}`);
        setErrorModal(true);
      });
    
    try {
      const lookUpPlant = httpsCallable(functions, 'lookUpPlant');
      const response = await lookUpPlant({ 'data': result });
      const plantData = response.data;
      console.dir(plantData);
      setPlantApiResult(plantData.result);
      setPlantName(plantData.result.classification.suggestions[0].name);
      setPlantImageUrl(plantData.input.images[0]);
      setPlantDateTime(plantData.input.datetime);
      setIsWaiting(false);
      setModalVisible(true);
    } catch (error) {
      setIsWaiting(false);
      setErrorMsg(`Error in plant lookup: ${error.message}`);
      setErrorModal(true);
    }
  }


  const saveIdentifiedPlantToDB = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    let location = await Location.getCurrentPositionAsync({});
    const plantItemToDB = {
      userEmail: user.email,
      title: plantName,
      description: plantApiResult.classification.suggestions[0]?.details?.description?.value,
      imageUrl: plantImageUrl,
      plantInfoUrl: plantApiResult.classification.suggestions[0]?.details?.description?.citation,
      dateTime: plantDateTime,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    try {
      const savePlant = httpsCallable(functions, 'savePlant');
      await savePlant({ 'data': plantItemToDB });
      setIsWaiting(false);
      setModalVisible(false);
      setErrorMsg(`${plantName} saved`);
      setErrorModal(true);
    } catch (error) {
      setModalVisible(false);
      setErrorMsg(`Error Saving Plant: ${error.message}`);
      setErrorModal(true);
    }

  };

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
    fetchPlantDetailsFromAPI(result.assets[0].uri);
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
      { isFocused && <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        
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
     </CameraView> }
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
            <View>
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
   </View> 
 );
} else {
  return <></>
}
  
}

export default CameraScreen;
