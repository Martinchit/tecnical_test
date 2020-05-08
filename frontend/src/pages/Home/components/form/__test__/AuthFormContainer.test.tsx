import React from 'react';
import { shallow } from 'enzyme';

import { AuthFormContainer } from '../AuthFormContainer';

describe('AuthFormContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AuthFormContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
