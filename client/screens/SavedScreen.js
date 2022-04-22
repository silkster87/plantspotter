import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth';
const BASE_URL = 'https://0233-78-147-209-58.eu.ngrok.io';

export default function SavedScreen() {
  const [plantsList, setPlantsList] = useState([]);

  useEffect(() => {
    (async () => {
      const auth = getAuth();
            
      fetch(`${BASE_URL}/plants`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data : auth.currentUser.email})
      }).then(res => res.json())
        .then(result => {
          console.log(result.data);
          setPlantsList(result.data);
        })
        .catch(err => console.error(err));

    })();
  }, []);

  function showPlantDetails(id) {
    //console.log('Plant ID: ', id);

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
      <FlatList data={plantsList} renderItem={renderItem} keyExtractor={item => item._id}/>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginBottom: 5
  },
  button: {  
    flexDirection: 'row',
    margin: 20
  },
  text: {
    marginLeft: 15,
    fontSize: 20,
  }
})