import axios, { AxiosStatic } from 'axios';

import { getStocks, searchStocks } from '../stocksService';

interface AxiosMock extends AxiosStatic {
  mockImplementation: Function;
  mockRestore: Function;
}

jest.mock('axios');

describe('orderService', () => {
  const mockedAxios = axios as AxiosMock;
  const token = 'testToken';
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
      price: 100
    }
  ];

  it('handles getStocks correctly', (done) => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          stocks,
        },
      });
    });
    getStocks(page, token).then((d) => {
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
        }
      });
      expect(d).toStrictEqual(stocks);
      mockedAxios.mockRestore();
      done();
    });
  });

  it('handles searchStocks correctly', (done) => {
    const query = 'test';
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          stocks,
        },
      });
    });
    searchStocks(query, page, token).then((d) => {
      expect(mockedAxios).toHaveBeenCalled();
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      expect(mockedAxios).toHaveBeenCalledWith({
        method: 'GET',
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
        url: '/stock/search',
        params: {
          query,
          page
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      expect(d).toStrictEqual(stocks);
      mockedAxios.mockRestore();
      done();
    });
  });
});
