import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { exhaustMap, filter, map, catchError } from 'rxjs/operators';
import { ActionType, isActionOf } from 'typesafe-actions';
import * as actions from '../actions';
import { RootState } from '../reducers';
import { getStocks, searchStocks } from '../services/stocksService';

type Action = ActionType<typeof actions>;

export const FetchStockEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.getStocks)),
    exhaustMap((action) =>
      from(getStocks(action.payload.page, action.payload.token)).pipe(
        map(actions.getStocksSuccess),
        catchError((error) => {
          if (error.response.data.code === 401) {
            return of(actions.sessionTimeout());
          } else {
            return of(actions.getStocksError(error.response.data));
          }
        })
      )
    )
  );

export const SearchStockEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.searchStocks)),
    exhaustMap((action) =>
      from(
        searchStocks(action.payload.query, action.payload.page, action.payload.token)
      ).pipe(
        map(actions.getStocksSuccess),
        catchError((error) => {
          if (error.response.data.code === 401) {
            return of(actions.sessionTimeout());
          } else {
            return of(actions.getStocksError(error.response.data));
          }
        })
      )
    )
  );

export default [FetchStockEpic, SearchStockEpic];
