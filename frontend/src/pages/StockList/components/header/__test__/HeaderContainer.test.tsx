import React from 'react';
import { shallow } from 'enzyme';

import { HeaderContainer } from '../HeaderContainer';

describe('HeaderContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeaderContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
