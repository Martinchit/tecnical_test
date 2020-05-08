import { createAction } from 'typesafe-actions';
import { Stock, ErrorResponse } from '../../types/types';

import {
  GET_STOCKS,
  GET_STOCKS_SUCCESS,
  GET_STOCKS_ERROR,
  SEARCH_STOCKS,
} from '../constants';

export const getStocks = createAction(GET_STOCKS, (page: number, token: string) => ({
  page,
  token,
}))();

export const getStocksSuccess = createAction(
  GET_STOCKS_SUCCESS,
  (stocks: Stock[]) => stocks
)();

export const getStocksError = createAction(
  GET_STOCKS_ERROR,
  (error: ErrorResponse) => error
)();

export const searchStocks = createAction(
  SEARCH_STOCKS,
  (query: string, page: number, token: string) => ({ query, page, token })
)();
