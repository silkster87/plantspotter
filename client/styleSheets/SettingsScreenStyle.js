import { StyleSheet } from 'react-native';
import COLORS from '../theme.js';

const styles = StyleSheet.create({
  centredView: {
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
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
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
    backgroundColor: COLORS.modalClose,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  }, 
  deleteButton: {
    backgroundColor: COLORS.black,
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: COLORS.primary,
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  },
  button2: {
    backgroundColor: COLORS.focused,
  }
})

export default styles;