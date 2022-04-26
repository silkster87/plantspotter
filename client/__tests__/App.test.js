import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

//This gets rid of the ReferenceError:
//'You are trying to 'import' a file after Jest environment has been torn down
jest.useFakeTimers();

describe('<App />' , () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})