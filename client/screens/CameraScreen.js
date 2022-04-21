import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React , { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera';

import { readAsStringAsync } from 'expo-file-system';

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  const BASE_URL = 'http://localhost:3001';

  const cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View/>;
  if (hasPermission === false) return <Text>No access to camera</Text>

  const takePhoto = async () => {
    if (cameraRef) {
      console.log('take photo');
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          quality: 1,
          aspect:[4,3]
        });
        return photo;
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} 
            onPress={async ()=> {
            
            const r = await takePhoto();
            //TODO: SEND PHOTO TO SERVER FOR IDENTIFICATION
            
            await readAsStringAsync(r.uri, {encoding: 'base64'})
              .then((response) => console.log('PICTURE:', response.slice(30)))
              .catch((error) => console.error(error));
            
            // await fetch(BASE_URL, {
            //   method: 'POST',
            //   headers: {'Content-Type': 'application/json'},
            //   body: JSON.stringify(contents)
            // })
            }}
          >
            <Text style={{ color: 'white' , fontWeight: 'bold' }}> Take Photo </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
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
    margin: 20,
    paddingBottom : 150
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
})