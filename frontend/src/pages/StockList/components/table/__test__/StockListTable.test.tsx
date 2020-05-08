import React from 'react';
import { shallow } from 'enzyme';

import { StockListTable } from '../StockListTable';
import { TableButton } from '../TableButton';
import { Alert } from '../../../../../core/components/atoms/Alert';
import { OrderSide } from '../../../../../types/types';

describe('StockListTable', () => {
  const props = {
    alert: {},
    stocks: [
      {
        id: 1,
        stockId: 'testOne',
        currency: 'HKD',
        ric: 'testOne',
        bloombergTicker: 'testOne',
        bloombergTickerLocal: 'testOne',
        name: 'testOne',
        country: 'testOne',
        price: 100,
      },
      {
        id: 2,
        stockId: 'testTwo',
        currency: 'HKD',
        ric: 'testTwo',
        bloombergTicker: 'testTwo',
        bloombergTickerLocal: 'testTwo',
        name: 'testTwo',
        country: 'testTwo',
        price: 200,
      },
    ],
    onActionButtonClickHandler: jest.fn(),
  };

  const restoreMock = () => {
    props.onActionButtonClickHandler.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<StockListTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers onActionButtonClickHandler on Buy Button click', () => {
    const wrapper = shallow(<StockListTable {...props} />);
    wrapper.find(TableButton).first().simulate('click');
    expect(props.onActionButtonClickHandler).toHaveBeenCalled();
    expect(props.onActionButtonClickHandler).toHaveBeenCalledWith('Buy', 0);
    restoreMock();
  });

  it('triggers onActionButtonClickHandler on Sell Button click', () => {
    const wrapper = shallow(<StockListTable {...props} />);
    wrapper.find(TableButton).at(1).simulate('click');
    expect(props.onActionButtonClickHandler).toHaveBeenCalled();
    expect(props.onActionButtonClickHandler).toHaveBeenCalledWith('Sell', 0);
    restoreMock();
  });

  it('renders alert if value is presented inside the alert props object', () => {
    const side = 'Sell' as OrderSide;
    const alert = {
      1: side,
    };
    const wrapper = shallow(
      <StockListTable
        alert={alert}
        stocks={props.stocks}
        onActionButtonClickHandler={props.onActionButtonClickHandler}
      />
    );
    expect(wrapper.find(Alert).length).toBe(1);
    expect(wrapper.find(Alert).text()).toBe(
      `${side} order for ${props.stocks[0].bloombergTickerLocal} is added to the Orders Basket`
    );
  });
});
