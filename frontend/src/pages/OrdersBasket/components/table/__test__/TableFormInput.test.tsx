import React from 'react';
import { shallow } from 'enzyme';

import { TableInputField } from '../TableInputField';

describe('TableInputField', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableInputField />);
    expect(wrapper).toMatchSnapshot();
  });
});
