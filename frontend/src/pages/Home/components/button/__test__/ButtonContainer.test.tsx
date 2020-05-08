import React from 'react';
import { shallow } from 'enzyme';

import { ButtonContainer } from '../ButtonContainer';

describe('ButtonContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ButtonContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
