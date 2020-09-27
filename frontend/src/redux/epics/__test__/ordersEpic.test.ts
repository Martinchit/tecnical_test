import axios, { AxiosStatic } from 'axios';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';

import { PostStockOrderEpic } from '../ordersEpic';
import { placeStockOrder } from '../../actions/ordersActions';
import {
  PLACE_STOCK_ORDER_SUCCESS,
  PLACE_STOCK_ORDER_ERROR,
} from '../../constants/ordersConstant';
import { SESSION_TIME_OUT } from '../../constants/authConstant';
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

describe('ordersEpic', () => {
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
    executionMode: 'Limit' as OrderExecutionMode,
    shareAmount: 100,
    orderPrice,
    orderId,
  };
  const errorResponse = {
    type: 'testError',
    description: 'testError',
    code: 500,
  };

  const mockSuccess = () => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          orderPrice,
        },
      });
    });
  };

  const mockFail = () => {
    mockedAxios.mockImplementation(() =>
      Promise.reject({ response: { data: errorResponse } })
    );
  };

  const restoreMock = () => {
    mockedAxios.mockRestore();
  };
  it('handles PostStockOrderEpic success case', async () => {
    mockSuccess();
    const action$ = ActionsObservable.of(placeStockOrder(stockOrder, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = PostStockOrderEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
        orderPrice: stockOrder.orderPrice,
        shareAmount: stockOrder.shareAmount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: PLACE_STOCK_ORDER_SUCCESS,
      payload: {
        orderId,
        orderPrice,
      },
    });
    restoreMock();
  });

  it('handles PostStockOrderEpic error case', async () => {
    mockFail();
    const action$ = ActionsObservable.of(placeStockOrder(stockOrder, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = PostStockOrderEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
        orderPrice: stockOrder.orderPrice,
        shareAmount: stockOrder.shareAmount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: PLACE_STOCK_ORDER_ERROR,
      payload: {
        orderId,
        error: { type: 'testError', description: 'testError', code: 500 },
      },
    });
    restoreMock();
  });

  it('triggers sessionTimeout in PostStockOrderEpic error case', async () => {
    const errorResponse = {
      type: 'testError',
      description: 'testError',
      code: 401,
    };
    mockedAxios.mockImplementation(() =>
      Promise.reject({ response: { data: errorResponse } })
    );
    const action$ = ActionsObservable.of(placeStockOrder(stockOrder, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = PostStockOrderEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
        orderPrice: stockOrder.orderPrice,
        shareAmount: stockOrder.shareAmount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: SESSION_TIME_OUT,
    });
    restoreMock();
  });
});
