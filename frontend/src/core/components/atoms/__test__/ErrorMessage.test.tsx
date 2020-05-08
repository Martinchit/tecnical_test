import React from 'react';
import { shallow } from 'enzyme';

import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ErrorMessage />);
    expect(wrapper).toMatchSnapshot();
  });
});
