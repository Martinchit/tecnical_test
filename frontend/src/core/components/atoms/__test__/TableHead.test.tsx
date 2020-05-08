import React from 'react';
import { shallow } from 'enzyme';

import { TableHead } from '../TableHead';

describe('TableHead', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableHead />);
    expect(wrapper).toMatchSnapshot();
  });
});
