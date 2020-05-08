import React from 'react';
import { shallow } from 'enzyme';

import { TableContainer } from '../TableContainer';

describe('TableContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
