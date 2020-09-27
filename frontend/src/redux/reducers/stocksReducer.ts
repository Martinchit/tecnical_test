import { ActionType, getType } from 'typesafe-actions';
import { actions } from '../actions';
import { Stock } from '../../types/types';
import { updateObject } from '../../core/lib/utils/updateObject';

type Action = ActionType<typeof actions>;

export interface StocksState {
  readonly loading: boolean;
  readonly stocks: Stock[];
  readonly error: boolean;
}

export const initialState: StocksState = {
  loading: false,
  stocks: [],
  error: false,
};

export const stocksReducer = (
  state: StocksState = initialState,
  action: Action
): StocksState => {
  switch (action.type) {
    case getType(actions.getStocks):
      return updateObject(state, { loading: true });
    case getType(actions.getStocksSuccess):
      return updateObject(state, { loading: false, stocks: action.payload });
    case getType(actions.getStocksError):
      return updateObject(state, { loading: false, error: true });
    case getType(actions.searchStocks):
      return updateObject(state, { loading: true });
    default:
      return state;
  }
};
