import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenshotImage: {
    width: '70%',
    height: 160,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  screenshotPlant: {
    width: '70%',
    height: 230,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    borderRadius: 10,
  },
  textNoSavedPlants: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
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
  button2: {
    backgroundColor: '#e32f45'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  container: {
    flex: 1,
    marginBottom: 140,
  },
  scrollViewContainer: {
    flex: 1,
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
});

export default styles;