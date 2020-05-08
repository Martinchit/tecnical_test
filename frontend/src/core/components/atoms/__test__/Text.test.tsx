import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { Text } from '../Text';

describe('Text', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Text />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders font-weight 200', () => {
    const wrapper = shallow(<Text fontWeight="light" />);
    expect(wrapper).toHaveStyleRule('font-weight', '200');
  });

  it('renders font-weight 400', () => {
    const wrapper = shallow(<Text fontWeight="normal" />);
    expect(wrapper).toHaveStyleRule('font-weight', '400');
  });

  it('renders font-weight 600', () => {
    const wrapper = shallow(<Text fontWeight="bold" />);
    expect(wrapper).toHaveStyleRule('font-weight', '600');
  });

  it('renders font-weight 800', () => {
    const wrapper = shallow(<Text fontWeight="extra-bold" />);
    expect(wrapper).toHaveStyleRule('font-weight', '800');
  });

  it('renders current font-size', () => {
    const wrapper = shallow(<Text fontSize={1} />);
    expect(wrapper).toHaveStyleRule('font-size', '1em');
  });
});
