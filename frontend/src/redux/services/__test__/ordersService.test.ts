import axios, { AxiosStatic } from 'axios';

import { postStockOrder } from '../ordersService';
import {
  OrderSide,
  OrderStatus,
  OrderExecutionMode,
} from '../../../types/types';

interface AxiosMock extends AxiosStatic {
  mockImplementation: Function;
  mockRestore: Function;
}

jest.mock('axios');

describe('orderService', () => {
  const orderId = '9cc4ca45-b42b-462d-a8aa-931e6041cfcb';
  const orderPrice = 100;
  const mockedAxios = axios as AxiosMock;
  const token = 'testToken';
  const stockOrder = {
    id: 1,
    stockId: 'testID',
    currency: 'HKD',
    bloombergTickerLocal: 'testTicker',
    side: 'Buy' as OrderSide,
    status: 'Not Ready' as OrderStatus,
    selected: false,
    executionMode: 'Market' as OrderExecutionMode,
    shareAmount: 100,
    orderPrice: 100,
    orderId,
  };

  it('handles postStockOrder for order with Market as executionMode', (done) => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          orderPrice,
        },
      });
    });
    postStockOrder(stockOrder, token).then((d) => {
      expect(mockedAxios).toHaveBeenCalled();
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      expect(mockedAxios).toHaveBeenCalledWith({
        method: 'POST',
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
        url: '/order',
        data: {
          side: stockOrder.side,
          stockId: stockOrder.stockId,
          stockCode: stockOrder.bloombergTickerLocal,
          executionMode: stockOrder.executionMode,
          orderPrice: null,
          shareAmount: stockOrder.shareAmount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(d).toBe(orderPrice);
      mockedAxios.mockRestore();
      done();
    });
  });

  it('handles postStockOrder for order with Limit as executionMode', (done) => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          orderPrice,
        },
      });
    });
    const o = { ...stockOrder, executionMode: 'Limit' as OrderExecutionMode };
    postStockOrder(o, token).then((d) => {
      expect(mockedAxios).toHaveBeenCalled();
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      expect(mockedAxios).toHaveBeenCalledWith({
        method: 'POST',
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
        url: '/order',
        data: {
          side: o.side,
          stockId: o.stockId,
          stockCode: o.bloombergTickerLocal,
          executionMode: o.executionMode,
          orderPrice: o.orderPrice,
          shareAmount: o.shareAmount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(d).toBe(orderPrice);
      mockedAxios.mockRestore();
      done();
    });
  });
});
