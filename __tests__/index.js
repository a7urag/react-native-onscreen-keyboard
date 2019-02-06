import React from 'react';
import OnBoardingKeyboard from '../dist/index';

import renderer from 'react-test-renderer';

test('Basic render', () => {
  const tree = renderer.create(<OnBoardingKeyboard onPress={()=>{}} input={"v"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
