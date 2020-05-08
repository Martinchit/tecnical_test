import React from 'react';
import { shallow } from 'enzyme';

import { TableCell } from '../TableCell';

describe('TableCell', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableCell />);
    expect(wrapper).toMatchSnapshot();
  });
});
