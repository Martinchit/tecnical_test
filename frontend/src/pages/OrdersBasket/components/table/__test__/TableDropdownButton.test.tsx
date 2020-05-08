import React from 'react';
import { shallow } from 'enzyme';

import { TableDropdownButton } from '../TableDropdownButton';

describe('TableDropdownButton', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableDropdownButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
