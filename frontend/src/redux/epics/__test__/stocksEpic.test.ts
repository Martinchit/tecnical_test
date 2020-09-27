import axios, { AxiosStatic } from 'axios';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';

import { FetchStockEpic, SearchStockEpic } from '../stocksEpic';
import {
  GET_STOCKS_SUCCESS,
  GET_STOCKS_ERROR,
} from '../../constants/stocksConstant';
import { SESSION_TIME_OUT } from '../../constants/authConstant';
import { getStocks, searchStocks } from '../../actions/stocksActions';

interface AxiosMock extends AxiosStatic {
  mockImplementation: Function;
  mockRestore: Function;
}

jest.mock('axios');

describe('stocksEpic', () => {
  const mockedAxios = axios as AxiosMock;
  const token = 'testToken';
  const query = 'test';
  const page = 1;
  const stocks = [
    {
      id: 1,
      stockId: 'testID',
      currency: 'HKD',
      ric: 'testRIC',
      bloombergTicker: 'testTicker',
      bloombergTickerLocal: 'testTicker',
      name: 'testName',
      country: 'testCountry',
      price: 100,
    },
  ];
  const errorResponse = {
    type: 'testError',
    description: 'testError',
    code: 500,
  };

  const mockSuccess = () => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          stocks,
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
  it('handles SearchStockEpic success case', async () => {
    const query = 'test';
    mockSuccess();
    const action$ = ActionsObservable.of(searchStocks(query, page, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = SearchStockEpic(action$, state$, {});

    const result = await epic$.toPromise();
    expect(mockedAxios).toHaveBeenCalled();
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock/search',
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: GET_STOCKS_SUCCESS,
      payload: stocks,
    });
    restoreMock();
  });

  it('handles SearchStockEpic error case', async () => {
    mockFail();
    const action$ = ActionsObservable.of(searchStocks(query, page, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = SearchStockEpic(action$, state$, {});

    const result = await epic$.toPromise();
    expect(mockedAxios).toHaveBeenCalled();
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock/search',
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: GET_STOCKS_ERROR,
      payload: {
        ...errorResponse,
      },
    });
    restoreMock();
  });

  it('triggers sessionTimeout in SearchStockEpic error case', async () => {
    const errorResponse = {
      type: 'testError',
      description: 'testError',
      code: 401,
    };
    mockedAxios.mockImplementation(() =>
      Promise.reject({ response: { data: errorResponse } })
    );
    const action$ = ActionsObservable.of(searchStocks(query, page, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = SearchStockEpic(action$, state$, {});

    const result = await epic$.toPromise();
    expect(mockedAxios).toHaveBeenCalled();
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock/search',
      params: {
        query,
        page,
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

  it('handles FetchStockEpic success case', async () => {
    mockSuccess();
    const action$ = ActionsObservable.of(getStocks(page, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = FetchStockEpic(action$, state$, {});

    const result = await epic$.toPromise();
    expect(mockedAxios).toHaveBeenCalled();
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock',
      params: {
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: GET_STOCKS_SUCCESS,
      payload: stocks,
    });
    restoreMock();
  });

  it('handles FetchStockEpic error case', async () => {
    const page = 1;
    mockFail();
    const action$ = ActionsObservable.of(getStocks(page, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = FetchStockEpic(action$, state$, {});

    const result = await epic$.toPromise();
    expect(mockedAxios).toHaveBeenCalled();
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock',
      params: {
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toStrictEqual({
      type: GET_STOCKS_ERROR,
      payload: {
        ...errorResponse,
      },
    });
    restoreMock();
  });

  it('triggers sessionTimeout in FetchStockEpic error case', async () => {
    const page = 1;
    const errorResponse = {
      type: 'testError',
      description: 'testError',
      code: 401,
    };
    mockedAxios.mockImplementation(() =>
      Promise.reject({ response: { data: errorResponse } })
    );
    const action$ = ActionsObservable.of(getStocks(page, token));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = FetchStockEpic(action$, state$, {});

    const result = await epic$.toPromise();
    expect(mockedAxios).toHaveBeenCalled();
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock',
      params: {
        page,
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
