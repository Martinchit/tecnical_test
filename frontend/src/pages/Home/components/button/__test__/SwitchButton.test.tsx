import React from 'react';
import { shallow } from 'enzyme';

import { SwitchButton } from '../SwitchButton';
import { ButtonContainer } from '../ButtonContainer';
import { AuthMode } from '../../../../../types/types';

describe('SwitchButton', () => {
  const props = {
    authType: 'Log In' as AuthMode,
    onClick: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallow(<SwitchButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly in Log In mode', () => {
    const wrapper = shallow(<SwitchButton {...props} />);
    expect(wrapper.find(ButtonContainer).text()).toBe('Change to Sign Up');
  });

  it('renders correctly in Sign Up mode', () => {
    const p = { ...props, authType: 'Sign Up' as AuthMode };
    const wrapper = shallow(<SwitchButton {...p} />);
    expect(wrapper.find(ButtonContainer).text()).toBe('Change to Log In');
  });
});
