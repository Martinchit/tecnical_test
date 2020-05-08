import React from 'react';
import { shallow } from 'enzyme';

import { StockListHeader } from '../StockListHeader';
import { HeaderButton } from '../HeaderButton';
import { HeaderInputField } from '../HeaderInputField';

describe('StockListHeader', () => {
  const props = {
    onClearButtonClickHandler: jest.fn(),
    onSearchValueChangeHandler: jest.fn(),
    onSearchButtonClickHandler: jest.fn(),
    searchValue: 'test',
    buttonsDisable: false,
    isStocksFiltered: false,
  };

  const restoreMock = () => {
    props.onClearButtonClickHandler.mockRestore();
    props.onSearchValueChangeHandler.mockRestore();
    props.onSearchButtonClickHandler.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<StockListHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers onSearchButtonClickHandler', () => {
    const wrapper = shallow(<StockListHeader {...props} />);
    wrapper.find(HeaderButton).first().simulate('click');
    expect(props.onSearchButtonClickHandler).toHaveBeenCalled();
    restoreMock();
  });

  it('triggers onClearButtonClickHandler', () => {
    const wrapper = shallow(<StockListHeader {...props} />);
    wrapper.find(HeaderButton).at(1).simulate('click');
    expect(props.onClearButtonClickHandler).toHaveBeenCalled();
    restoreMock();
  });

  it('triggers onSearchValueChangeHandler', () => {
    const wrapper = shallow(<StockListHeader {...props} />);
    wrapper
      .find(HeaderInputField)
      .first()
      .simulate('change', { target: { value: 'test' } });
    expect(props.onSearchValueChangeHandler).toHaveBeenCalled();
    expect(props.onSearchValueChangeHandler).toHaveBeenCalledWith('test');
    restoreMock();
  });
});
