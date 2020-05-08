import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from 'react-bootstrap';

import { NavBar } from '../NavBar';

describe('NavBar', () => {
  it('renders correctly', () => {
    const loggedIn = false;
    const logOutAction = jest.fn();
    const wrapper = shallow(
      <NavBar loggedIn={loggedIn} logOutAction={logOutAction} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Nav).length).toBe(0);
  });

  it('check current url', () => {
    const loggedIn = true;
    const logOutAction = jest.fn();
    const { location } = window;
    const href = 'http://test.com/test';
    delete window.location;
    window.location = {
      ...location,
      href,
    };
    const wrapper = shallow(
      <NavBar loggedIn={loggedIn} logOutAction={logOutAction} />
    );
    expect(wrapper.find(Nav).first().props().defaultActiveKey).toBe('test');
    window.location = location;
  });
});
