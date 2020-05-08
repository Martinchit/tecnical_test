import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';

import { App } from './App';

describe('App', () => {
  const logOutAction = jest.fn();
  it('renders correctly', () => {
    const loggedIn = false;
    const wrapper = shallow(<App loggedIn={loggedIn} logOutAction={logOutAction} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders routes before logged in', () => {
    const loggedIn = false;
    const wrapper = shallow(<App loggedIn={loggedIn} logOutAction={logOutAction} />);
    expect(wrapper.find(Route).length).toBe(1);
    expect(wrapper.find(Redirect).props().to).toBe('/');
  });

  it('renders routes after logged in', () => {
    const loggedIn = true;
    const wrapper = shallow(<App loggedIn={loggedIn} logOutAction={logOutAction} />);
    expect(wrapper.find(Route).length).toBe(2);
    expect(wrapper.find(Redirect).props().to).toBe('/stock_list');
  });
});
