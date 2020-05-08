import React from 'react';
import { shallow } from 'enzyme';

import { FlexBox } from '../FlexBox';

describe('FlexBox', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FlexBox />);
    expect(wrapper).toMatchSnapshot();
  });
});
