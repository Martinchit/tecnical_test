import { combineReducers } from 'redux';

import { stocksReducer, StocksState } from './stocksReducer';
import { ordersReducer, OrdersState } from './ordersReducer';
import { authReducer, AuthState } from './authReducer';

export type RootState = {
  auth: AuthState;
  stocks: StocksState;
  orders: OrdersState;
};

const reducers = combineReducers({
  auth: authReducer,
  stocks: stocksReducer,
  orders: ordersReducer,
});

export default reducers;
