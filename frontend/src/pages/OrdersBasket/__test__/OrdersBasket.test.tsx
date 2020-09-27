import React from 'react';
import { shallow } from 'enzyme';

import { OrdersBasket } from '../OrdersBasket';
import { OrdersBasketHeader } from '../components/header/OrdersBasketHeader';
import { OrdersBasketTable } from '../components/table/OrdersBasketTable';
import {
  OrderSide,
  OrderStatus,
  OrderExecutionMode,
} from '../../../types/types';

describe('OrdersBasket', () => {
  const orderId = '9cc4ca45-b42b-462d-a8aa-931e6041cfcb';
  const props = {
    removeStockInOrderAction: jest.fn(),
    selectStockInOrderAction: jest.fn(),
    unselectStockInOrderAction: jest.fn(),
    updateStockOrderExecutionModeAction: jest.fn(),
    updateStockOrderOrderPriceAction: jest.fn(),
    updateStockOrderShareAmountAction: jest.fn(),
    updateStockOrderStatusAction: jest.fn(),
    placeStockOrderAction: jest.fn(),
    acknowledgeStockOrderErrorAction: jest.fn(),
    logOutAction: jest.fn(),
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
    token: 'testToken',
    sessionTimeout: false,
  };

  const restoreMock = () => {
    props.removeStockInOrderAction.mockRestore();
    props.selectStockInOrderAction.mockRestore();
    props.unselectStockInOrderAction.mockRestore();
    props.updateStockOrderExecutionModeAction.mockRestore();
    props.updateStockOrderOrderPriceAction.mockRestore();
    props.updateStockOrderShareAmountAction.mockRestore();
    props.updateStockOrderStatusAction.mockRestore();
    props.placeStockOrderAction.mockRestore();
    props.acknowledgeStockOrderErrorAction.mockRestore();
  };

  it('renders correctly', () => {
    const wrapper = shallow(<OrdersBasket {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles onRemoveButtonClickHandler in OrdersBasketHeader', () => {
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketHeader)
      .first()
      .props()
      .onRemoveButtonClickHandler();
    expect(props.removeStockInOrderAction).toHaveBeenCalled();
    restoreMock();
  });

  it('handles onBookButtonClickHandler in OrdersBasketHeader', () => {
    const p = { ...props, orders: [{ ...props.orders[0], selected: true }] };
    const wrapper = shallow(<OrdersBasket {...p} />);
    wrapper.find(OrdersBasketHeader).first().props().onBookButtonClickHandler();
    expect(props.placeStockOrderAction).toHaveBeenCalled();
    expect(props.placeStockOrderAction).toHaveBeenCalledTimes(1);
    expect(props.placeStockOrderAction).toHaveBeenCalledWith(
      p.orders[0],
      props.token
    );
    restoreMock();
  });

  it('handles onSelectCheckClickHandler in OrdersBasketTable & calls unselectStockInOrderAction', () => {
    const selected = true;
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onSelectCheckClickHandler(orderId, selected);
    expect(props.unselectStockInOrderAction).toHaveBeenCalled();
    expect(props.unselectStockInOrderAction).toHaveBeenCalledWith(orderId);
    restoreMock();
  });

  it('handles onSelectCheckClickHandler in OrdersBasketTable & calls selectStockInOrderAction', () => {
    const selected = false;
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onSelectCheckClickHandler(orderId, selected);
    expect(props.selectStockInOrderAction).toHaveBeenCalled();
    expect(props.selectStockInOrderAction).toHaveBeenCalledWith(orderId);
    restoreMock();
  });

  it('handles onExecutionModeSelectHandler in OrdersBasketHeader', () => {
    const stockIdx = 0;
    const modeId = 0;
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onExecutionModeSelectHandler(stockIdx, modeId);
    expect(props.updateStockOrderExecutionModeAction).toHaveBeenCalled();
    expect(props.updateStockOrderExecutionModeAction).toHaveBeenCalledWith(
      stockIdx,
      'Market'
    );
    expect(props.updateStockOrderOrderPriceAction).toHaveBeenCalled();
    expect(props.updateStockOrderOrderPriceAction).toHaveBeenCalledWith(
      stockIdx,
      0
    );
    restoreMock();
  });

  it('handles onOrderPriceChangeHandler in OrdersBasketHeader', () => {
    const stockIdx = 0;
    const orderPrice = '100';
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onOrderPriceChangeHandler(stockIdx, orderPrice);
    expect(props.updateStockOrderOrderPriceAction).toHaveBeenCalled();
    expect(props.updateStockOrderOrderPriceAction).toHaveBeenCalledWith(
      stockIdx,
      Number(orderPrice)
    );
    restoreMock();
  });

  it('handles onShareAmountChangeHandler in OrdersBasketHeader', () => {
    const stockIdx = 0;
    const shareAmount = '100';
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onShareAmountChangeHandler(stockIdx, shareAmount);
    expect(props.updateStockOrderShareAmountAction).toHaveBeenCalled();
    expect(props.updateStockOrderShareAmountAction).toHaveBeenCalledWith(
      stockIdx,
      Number(shareAmount)
    );
    restoreMock();
  });

  it('triggers updateStockOrderStatusAction to Ready', () => {
    const p = { ...props, orders: [{ ...props.orders[0], shareAmount: 100 }] };
    const stockIdx = 0;
    const modeId = 0;
    const wrapper = shallow(<OrdersBasket {...p} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onExecutionModeSelectHandler(stockIdx, modeId);
    expect(props.updateStockOrderExecutionModeAction).toHaveBeenCalled();
    expect(props.updateStockOrderExecutionModeAction).toHaveBeenCalledWith(
      stockIdx,
      'Market'
    );
    expect(props.updateStockOrderOrderPriceAction).toHaveBeenCalled();
    expect(props.updateStockOrderOrderPriceAction).toHaveBeenCalledWith(
      stockIdx,
      0
    );
    expect(props.updateStockOrderStatusAction).toHaveBeenCalled();
    expect(props.updateStockOrderStatusAction).toHaveBeenCalledWith(
      stockIdx,
      'Ready'
    );
    restoreMock();
  });

  it('triggers updateStockOrderStatusAction to Not Ready', () => {
    const p = {
      ...props,
      orders: [
        {
          ...props.orders[0],
          shareAmount: 100,
          executionMode: 'Market' as OrderExecutionMode,
          status: 'Ready' as OrderStatus,
        },
      ],
    };
    const stockIdx = 0;
    const modeId = 1;
    const wrapper = shallow(<OrdersBasket {...p} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onExecutionModeSelectHandler(stockIdx, modeId);
    expect(props.updateStockOrderExecutionModeAction).toHaveBeenCalled();
    expect(props.updateStockOrderExecutionModeAction).toHaveBeenCalledWith(
      stockIdx,
      'Limit'
    );
    expect(props.updateStockOrderStatusAction).toHaveBeenCalled();
    expect(props.updateStockOrderStatusAction).toHaveBeenCalledWith(
      stockIdx,
      'Not Ready'
    );
    restoreMock();
  });

  it('handles onCancelButtonClickHandler in OrdersBasketHeader', () => {
    const stockIdx = 0;
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper
      .find(OrdersBasketTable)
      .first()
      .props()
      .onCancelButtonClickHandler(stockIdx);
    expect(props.acknowledgeStockOrderErrorAction).toHaveBeenCalled();
    expect(props.acknowledgeStockOrderErrorAction).toHaveBeenCalledWith(
      stockIdx
    );
    restoreMock();
  });

  it('handles no OrdersBasketTable when there is no orders', () => {
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper.setProps({ orders: [] });
    expect(wrapper.find(OrdersBasketTable).length).toBe(0);
    restoreMock();
  });

  it('handles sessionTimeout change', () => {
    const { alert } = window;
    // delete window.alert;
    window.alert = jest.fn();
    const wrapper = shallow(<OrdersBasket {...props} />);
    wrapper.setProps({ sessionTimeout: true });
    expect(window.alert).toHaveBeenCalled();
    expect(props.logOutAction).toHaveBeenCalled();
    restoreMock();
    window.alert = alert;
  });
});
