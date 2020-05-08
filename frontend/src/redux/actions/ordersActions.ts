import { createAction } from 'typesafe-actions';
import {
  StockOrder,
  OrderExecutionMode,
  OrderStatus,
  ErrorResponse,
} from '../../types/types';

import {
  ADD_STOCK_IN_ORDER,
  REMOVE_STOCK_IN_ORDER,
  SELECT_STOCK_IN_ORDER,
  UNSELECT_STOCK_IN_ORDER,
  UPDATE_STOCK_ORDER_STATUS,
  UPDATE_STOCK_ORDER_EXECUTION_MODE,
  UPDATE_STOCK_ORDER_ORDER_PRICE,
  UPDATE_STOCK_ORDER_SHARE_AMOUNT,
  PLACE_STOCK_ORDER,
  PLACE_STOCK_ORDER_SUCCESS,
  PLACE_STOCK_ORDER_ERROR,
  ACKNOWLEDGE_STOCK_ORDER_ERROR,
} from '../constants';

export const addStockInOrder = createAction(
  ADD_STOCK_IN_ORDER,
  (stock: StockOrder) => stock
)();

export const removeStockInOrder = createAction(REMOVE_STOCK_IN_ORDER)();

export const selectStockInOrder = createAction(
  SELECT_STOCK_IN_ORDER,
  (orderId: string) => orderId
)();

export const unselectStockInOrder = createAction(
  UNSELECT_STOCK_IN_ORDER,
  (orderId: string) => orderId
)();

export const updateStockOrderStatus = createAction(
  UPDATE_STOCK_ORDER_STATUS,
  (idx: number, status: OrderStatus) => ({ idx, status })
)();

export const updateStockOrderExecutionMode = createAction(
  UPDATE_STOCK_ORDER_EXECUTION_MODE,
  (idx: number, executionMode: OrderExecutionMode) => ({ idx, executionMode })
)();

export const updateStockOrderOrderPrice = createAction(
  UPDATE_STOCK_ORDER_ORDER_PRICE,
  (idx: number, orderPrice: number) => ({ idx, orderPrice })
)();

export const updateStockOrderShareAmount = createAction(
  UPDATE_STOCK_ORDER_SHARE_AMOUNT,
  (idx: number, shareAmount: number) => ({ idx, shareAmount })
)();

export const placeStockOrder = createAction(
  PLACE_STOCK_ORDER,
  (stockOrder: StockOrder, token: string) => ({ stockOrder, token })
)();

export const placeStockOrderSuccess = createAction(
  PLACE_STOCK_ORDER_SUCCESS,
  (orderId: string, orderPrice: number) => ({ orderId, orderPrice })
)();

export const placeStockOrderError = createAction(
  PLACE_STOCK_ORDER_ERROR,
  (orderId: string, error: ErrorResponse) => ({ orderId, error })
)();

export const acknowledgeStockOrderError = createAction(
  ACKNOWLEDGE_STOCK_ORDER_ERROR,
  (idx: number) => idx
)();
