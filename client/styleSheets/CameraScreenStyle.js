import { StyleSheet } from 'react-native';
import COLORS from '../theme.js';

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
    backgroundColor: COLORS.modalClose,
  },
  buttonClose: {
    width: 100,
    backgroundColor: COLORS.modalClose,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
  },
  buttonModalCloseCancel: {
    backgroundColor: COLORS.focused,
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
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
})

export default styles;