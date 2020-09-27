import { createAction } from 'typesafe-actions';
import { Stock, ErrorResponse } from '../../types/types';

import { constants } from '../constants';

export const getStocks = createAction(
  constants.GET_STOCKS,
  (page: number, token: string) => ({
    page,
    token,
  })
)();

export const getStocksSuccess = createAction(
  constants.GET_STOCKS_SUCCESS,
  (stocks: Stock[]) => stocks
)();

export const getStocksError = createAction(
  constants.GET_STOCKS_ERROR,
  (error: ErrorResponse) => error
)();

export const searchStocks = createAction(
  constants.SEARCH_STOCKS,
  (query: string, page: number, token: string) => ({ query, page, token })
)();
