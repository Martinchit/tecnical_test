import { stocksReducer, initialState } from '../stocksReducer';
import {
  getStocks,
  getStocksSuccess,
  getStocksError,
  searchStocks
} from '../../actions/stocksActions';
import { Stock, ErrorResponse } from '../../../types/types';

describe('stocksReducer', () => {
  const token = 'testToken';

  it('should handle getStocks', () => {
    const action = getStocks(1, token);
    expect(stocksReducer(undefined, action)).toEqual({ ...initialState, loading: true });
  });

  it('should handle searchStocks', () => {
    const action = searchStocks('test', token);
    expect(stocksReducer(undefined, action)).toEqual({ ...initialState, loading: true });
  });


  it('should handle getStocksSuccess', () => {
    const state = { ...initialState, loading: true }
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
      } as Stock
    ]
    const action = getStocksSuccess(stocks);
    expect(stocksReducer(state, action)).toEqual({ ...initialState, stocks, loading: false });
  });

  it('should handle getStocksError', () => {
    const state = { ...initialState, loading: true }
    const error = {
      type: 'testError',
      description: 'testError',
      code: 400
    } as ErrorResponse;
    const action = getStocksError(error);
    expect(stocksReducer(state, action)).toEqual({ ...initialState, error: true, loading: false });
  });
});
