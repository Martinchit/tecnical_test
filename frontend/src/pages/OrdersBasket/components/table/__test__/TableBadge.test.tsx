import React from 'react';
import { shallow } from 'enzyme';

import { TableBadge } from '../TableBadge';

describe('TableBadge', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableBadge orderStatus="Booked" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders success Badge', () => {
    const wrapper = shallow(<TableBadge orderStatus="Booked" />);
    expect(wrapper.props().variant).toBe('success');
  });

  it('renders info Badge', () => {
    const wrapper = shallow(<TableBadge orderStatus="In Progress" />);
    expect(wrapper.props().variant).toBe('info');
  });

  it('renders danger Badge', () => {
    const wrapper = shallow(<TableBadge orderStatus="Rejected" />);
    expect(wrapper.props().variant).toBe('danger');
  });

  it('renders primary Badge', () => {
    const wrapper = shallow(<TableBadge orderStatus="Ready" />);
    expect(wrapper.props().variant).toBe('primary');
  });

  it('renders warning Badge', () => {
    const wrapper = shallow(<TableBadge orderStatus="Not Ready" />);
    expect(wrapper.props().variant).toBe('warning');
  });
});
