import React, { useState as useStateMock } from 'react';
import LoginScreen from '../screens/LoginScreen';
import renderer from 'react-test-renderer';


// TODO - mock firebase authentication
jest.useFakeTimers();

// jest.mock('firebase/app', () => {
//   return {
//     auth: jest.fn(),
//   }
// });

jest.mock('@react-navigation/core', () => {
  return {
    useNavigation: jest.fn(),
  }
});

jest.mock('firebase/auth', () => {
  return {
    initializeApp: jest.fn(() => {
      return {
        createUserWithEmailAndPassword: jest.fn((para1, para2) => {
          return new Promise(function(resolve, reject) {
            resolve({
              email: 'test@example.com',
              uid: '12345678'
            });

            reject({ message: 'error'});
          });
        }),
        onAuthStateChanged: jest.fn(() => {
          return {
            email: 'test@example.com',
            uid: '12345678'
          }
        }),
        signInWithEmailAndPassword: jest.fn((para1, para2) => {
          return new Promise(function(resolve, reject) {
            reject({message: 'error'});
          })
        })
      }
    }),
    getAuth: jest.fn(() => {
      return  {
        email: 'test@example.com',
        uid: '12345678'
      }
    })
  }
})



jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('<LoginScreen />: ', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
  });

  it('renders', () => {
    const tree = renderer.create(<LoginScreen/>).toJSON();

    expect(tree).toMatchSnapshot();
  })

  

});