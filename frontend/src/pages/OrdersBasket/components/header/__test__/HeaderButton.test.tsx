import React from 'react';
import { shallow } from 'enzyme';

import { HeaderButton } from '../HeaderButton';

describe('HeaderButton', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeaderButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
