import React from 'react';
import { shallow } from 'enzyme';

import { OrdersBasketHeader } from '../OrdersBasketHeader';
import { HeaderButton } from '../HeaderButton';

describe('HeaderContainer', () => {
  const props = {
    onRemoveButtonClickHandler: jest.fn(),
    onBookButtonClickHandler: jest.fn(),
    removeButtonDisable: true,
    bookButtonDisable: true,
  };

  const restoreMock = () => {
    props.onRemoveButtonClickHandler.mockRestore();
    props.onBookButtonClickHandler.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<OrdersBasketHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers onRemoveButtonClickHandler', () => {
    const wrapper = shallow(<OrdersBasketHeader {...props} />);
    wrapper.find(HeaderButton).first().simulate('click');
    expect(props.onRemoveButtonClickHandler).toHaveBeenCalled();
    restoreMock();
  });

  it('triggers onBookButtonClickHandler', () => {
    const wrapper = shallow(<OrdersBasketHeader {...props} />);
    wrapper.find(HeaderButton).at(1).simulate('click');
    expect(props.onBookButtonClickHandler).toHaveBeenCalled();
    restoreMock();
  });
});
