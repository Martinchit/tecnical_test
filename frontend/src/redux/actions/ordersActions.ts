import { createAction } from 'typesafe-actions';
import {
  StockOrder,
  OrderExecutionMode,
  OrderStatus,
  ErrorResponse,
} from '../../types/types';

import { constants } from '../constants';

export const addStockInOrder = createAction(
  constants.ADD_STOCK_IN_ORDER,
  (stock: StockOrder) => stock
)();

export const removeStockInOrder = createAction(
  constants.REMOVE_STOCK_IN_ORDER
)();

export const selectStockInOrder = createAction(
  constants.SELECT_STOCK_IN_ORDER,
  (orderId: string) => orderId
)();

export const unselectStockInOrder = createAction(
  constants.UNSELECT_STOCK_IN_ORDER,
  (orderId: string) => orderId
)();

export const updateStockOrderStatus = createAction(
  constants.UPDATE_STOCK_ORDER_STATUS,
  (idx: number, status: OrderStatus) => ({ idx, status })
)();

export const updateStockOrderExecutionMode = createAction(
  constants.UPDATE_STOCK_ORDER_EXECUTION_MODE,
  (idx: number, executionMode: OrderExecutionMode) => ({ idx, executionMode })
)();

export const updateStockOrderOrderPrice = createAction(
  constants.UPDATE_STOCK_ORDER_ORDER_PRICE,
  (idx: number, orderPrice: number) => ({ idx, orderPrice })
)();

export const updateStockOrderShareAmount = createAction(
  constants.UPDATE_STOCK_ORDER_SHARE_AMOUNT,
  (idx: number, shareAmount: number) => ({ idx, shareAmount })
)();

export const placeStockOrder = createAction(
  constants.PLACE_STOCK_ORDER,
  (stockOrder: StockOrder, token: string) => ({ stockOrder, token })
)();

export const placeStockOrderSuccess = createAction(
  constants.PLACE_STOCK_ORDER_SUCCESS,
  (orderId: string, orderPrice: number) => ({ orderId, orderPrice })
)();

export const placeStockOrderError = createAction(
  constants.PLACE_STOCK_ORDER_ERROR,
  (orderId: string, error: ErrorResponse) => ({ orderId, error })
)();

export const acknowledgeStockOrderError = createAction(
  constants.ACKNOWLEDGE_STOCK_ORDER_ERROR,
  (idx: number) => idx
)();
