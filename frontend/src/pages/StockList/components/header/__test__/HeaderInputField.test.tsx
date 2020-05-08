import React from 'react';
import { shallow } from 'enzyme';

import { HeaderInputField } from '../HeaderInputField';

describe('HeaderInputField', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeaderInputField />);
    expect(wrapper).toMatchSnapshot();
  });
});
