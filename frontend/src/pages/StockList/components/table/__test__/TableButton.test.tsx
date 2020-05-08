import React from 'react';
import { shallow } from 'enzyme';

import { TableButton } from '../TableButton';

describe('TableButton', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
