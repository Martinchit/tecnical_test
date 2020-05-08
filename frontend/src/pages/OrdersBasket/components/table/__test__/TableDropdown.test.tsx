import React from 'react';
import { shallow } from 'enzyme';

import { TableDropdown } from '../TableDropdown';

describe('TableDropdown', () => {
  const props = {
    title: undefined,
    dropdownID: 'testDropdown',
    onSelect: jest.fn(),
    disabled: false,
  };

  const restoreMock = () => {
    props.onSelect.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<TableDropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers onSelect when a dropdown option is selected', () => {
    const optionID = 1;
    const wrapper = shallow(<TableDropdown {...props} />);
    wrapper.simulate('select', optionID);
    expect(props.onSelect).toHaveBeenCalled();
    expect(props.onSelect).toHaveBeenCalledWith(optionID);
  });
});
