import { StyleSheet } from 'react-native';
import COLORS from '../theme.js';

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
    color: COLORS.modalClose,
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
    backgroundColor: COLORS.modalClose,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: COLORS.focused,
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
  },
  sortViewContainer: {
    padding: 8,
    alignItems: 'center',
    gap: 8,
    paddingLeft: 16
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default styles;