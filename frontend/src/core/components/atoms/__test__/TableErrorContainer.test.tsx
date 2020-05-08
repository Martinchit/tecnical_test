import React from 'react';
import { shallow } from 'enzyme';

import { TableErrorContainer } from '../TableErrorContainer';

describe('TableErrorContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableErrorContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
