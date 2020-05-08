import React from 'react';
import { shallow } from 'enzyme';
import { Form, Button } from 'react-bootstrap';

import { OrdersBasketTable } from '../OrdersBasketTable';
import { TableDropdown } from '../TableDropdown';
import { TableInputField } from '../TableInputField';
import {
  OrderSide,
  OrderStatus,
  ErrorResponse,
  OrderExecutionMode,
} from '../../../../../types/types';

describe('OrdersBasketTable', () => {
  const orderId = '9cc4ca45-b42b-462d-a8aa-931e6041cfcb';
  const props = {
    onSelectCheckClickHandler: jest.fn(),
    onExecutionModeSelectHandler: jest.fn(),
    onOrderPriceChangeHandler: jest.fn(),
    onShareAmountChangeHandler: jest.fn(),
    onCancelButtonClickHandler: jest.fn(),
    orders: [
      {
        id: 1,
        stockId: 'testID',
        currency: 'HKD',
        bloombergTickerLocal: 'testTicker',
        side: 'Buy' as OrderSide,
        status: 'Not Ready' as OrderStatus,
        selected: false,
        orderId,
      },
    ],
  };

  const restoreMock = () => {
    props.onSelectCheckClickHandler.mockRestore();
    props.onExecutionModeSelectHandler.mockRestore();
    props.onOrderPriceChangeHandler.mockRestore();
    props.onShareAmountChangeHandler.mockRestore();
    props.onCancelButtonClickHandler.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<OrdersBasketTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles onSelectCheckClickHandler', () => {
    const wrapper = shallow(<OrdersBasketTable {...props} />);
    wrapper.find(Form.Check).first().simulate('change');
    expect(props.onSelectCheckClickHandler).toHaveBeenCalled();
    expect(props.onSelectCheckClickHandler).toHaveBeenCalledWith(
      props.orders[0].orderId,
      props.orders[0].selected
    );
    restoreMock();
  });

  it('handles onExecutionModeSelectHandler', () => {
    const optionId = 1;
    const wrapper = shallow(<OrdersBasketTable {...props} />);
    wrapper.find(TableDropdown).first().simulate('select', optionId);
    expect(props.onExecutionModeSelectHandler).toHaveBeenCalled();
    expect(props.onExecutionModeSelectHandler).toHaveBeenCalledWith(0, optionId);
    restoreMock();
  });

  it('handles onOrderPriceChangeHandler', () => {
    const event = { target: { value: 'test' } };
    const wrapper = shallow(<OrdersBasketTable {...props} />);
    wrapper.find(TableInputField).first().simulate('change', event);
    expect(props.onOrderPriceChangeHandler).toHaveBeenCalled();
    expect(props.onOrderPriceChangeHandler).toHaveBeenCalledWith(
      0,
      event.target.value
    );
    restoreMock();
  });

  it('handles onShareAmountChangeHandler', () => {
    const event = { target: { value: 'test' } };
    const wrapper = shallow(<OrdersBasketTable {...props} />);
    wrapper.find(TableInputField).last().simulate('change', event);
    expect(props.onShareAmountChangeHandler).toHaveBeenCalled();
    expect(props.onShareAmountChangeHandler).toHaveBeenCalledWith(
      0,
      event.target.value
    );
    restoreMock();
  });

  it('handles onCancelButtonClickHandler', () => {
    const p = {
      ...props,
      orders: [
        {
          id: 1,
          stockId: 'testID',
          currency: 'HKD',
          bloombergTickerLocal: 'testTicker',
          side: 'Buy' as OrderSide,
          status: 'Not Ready' as OrderStatus,
          error: 'Test Error',
          selected: false,
          orderId,
        },
      ],
    };
    const wrapper = shallow(<OrdersBasketTable {...p} />);
    wrapper.find(Button).last().simulate('click');
    expect(props.onCancelButtonClickHandler).toHaveBeenCalled();
    restoreMock();
  });

  it('disables dropdown and order price input field', () => {
    const p = {
      ...props,
      orders: [
        {
          id: 1,
          stockId: 'testID',
          currency: 'HKD',
          bloombergTickerLocal: 'testTicker',
          side: 'Buy' as OrderSide,
          status: 'Not Ready' as OrderStatus,
          error: 'Test Error',
          executionMode: 'Market' as OrderExecutionMode,
          selected: false,
          orderId,
        },
      ],
    };
    const wrapper = shallow(<OrdersBasketTable {...p} />);
    wrapper.find(Button).last().simulate('click');
    expect(wrapper.find(TableInputField).first().props().disabled).toBeTruthy();
    restoreMock();
  });

  it('disables dropdown and input field when status is not ready nor not ready', () => {
    const p = {
      ...props,
      orders: [
        {
          id: 1,
          stockId: 'testID',
          currency: 'HKD',
          bloombergTickerLocal: 'testTicker',
          side: 'Buy' as OrderSide,
          status: 'Booked' as OrderStatus,
          error: 'Test Error',
          selected: false,
          orderId,
        },
      ],
    };
    const wrapper = shallow(<OrdersBasketTable {...p} />);
    wrapper.find(Button).last().simulate('click');
    expect(wrapper.find(TableDropdown).first().props().disabled).toBeTruthy();
    expect(wrapper.find(TableInputField).first().props().disabled).toBeTruthy();
    expect(wrapper.find(TableInputField).last().props().disabled).toBeTruthy();
    restoreMock();
  });
});
