// import ExampleComponent from './';
import React from 'react';
import renderer from 'react-test-renderer';
import Frothy from './components/Frothy';

it('renders correctly', () => {
  const tree = renderer.create(<Frothy />).toJSON();
  expect(tree).toMatchSnapshot();
});

// describe('ExampleComponent', () => {
//   it('is truthy', () => {
//     expect(ExampleComponent).toBeTruthy()
//   })
// })
