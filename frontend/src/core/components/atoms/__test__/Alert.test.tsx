import React from 'react';
import { shallow } from 'enzyme';

import { Alert } from '../Alert';

describe('Alert', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Alert />);
    expect(wrapper).toMatchSnapshot();
  });
});
