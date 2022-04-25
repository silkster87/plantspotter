import { StyleSheet } from 'react-native';
import COLORS from '../theme.js';

const styles = StyleSheet.create({
  svgContainer: {
    width: 75,
    height: 75,
    marginBottom: 20,
  },  
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },  
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
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
    fontSize: 16
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16
  }

})

export default styles;