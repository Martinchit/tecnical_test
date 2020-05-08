import { ordersReducer, initialState } from '../ordersReducer';
import {
  addStockInOrder,
  removeStockInOrder,
  selectStockInOrder,
  unselectStockInOrder,
  updateStockOrderStatus,
  updateStockOrderExecutionMode,
  updateStockOrderOrderPrice,
  updateStockOrderShareAmount,
  placeStockOrder,
  placeStockOrderSuccess,
  placeStockOrderError,
  acknowledgeStockOrderError
} from '../../actions/ordersActions';
import { ErrorResponse, StockOrder, OrderStatus } from '../../../types/types';

describe('ordersReducer', () => {
  const orderId = '9cc4ca45-b42b-462d-a8aa-931e6041cfcb';
  const token = 'testToken';
  const stockOrder = {
    id: 1,
    stockId: '1',
    currency: 'HKD',
    bloombergTickerLocal: 'testTicker',
    side: 'Buy',
    status: 'Ready',
    selected: false,
    orderId
  } as StockOrder;

  it('should handle addStockInOrder', () => {
    const action = addStockInOrder(stockOrder);
    expect(ordersReducer(undefined, action)).toEqual({ ...initialState, orders: [stockOrder] });
  });

  it('should handle removeStockInOrder', () => {
    const state = { ...initialState, orders: [stockOrder, { ...stockOrder, selected: true }] };
    const action = removeStockInOrder();
    expect(ordersReducer(state, action)).toEqual({ ...initialState, orders: [stockOrder] });
  });

  it('should handle selectStockInOrder', () => {
    const state = { ...initialState, orders: [stockOrder] };
    const action = selectStockInOrder(orderId);
    expect(ordersReducer(state, action)).toEqual({ ...state, orders: [{...stockOrder, selected: true }] });
  })

  it('should handle unselectStockInOrder', () => {
    const state = { ...initialState, orders: [{ ...stockOrder, selected: true }] };
    const action = unselectStockInOrder(orderId);
    expect(ordersReducer(state, action)).toEqual({ ...state, orders: [{...stockOrder, selected: false }] });
  })

  it('should handle updateStockOrderStatus', () => {
    const status = 'Ready';
    const state = { ...initialState, orders: [stockOrder] };
    const action = updateStockOrderStatus(0, status);
    expect(ordersReducer(state, action)).toEqual({ ...state, orders: [{...stockOrder, status }] });
  })

  it('should handle updateStockOrderExecutionMode', () => {
    const executionMode = 'Limit';
    const state = { ...initialState, orders: [stockOrder] };
    const action = updateStockOrderExecutionMode(0, executionMode);
    expect(ordersReducer(state, action)).toEqual({ ...state, orders: [{...stockOrder, executionMode }] });
  })

  it('should handle updateStockOrderOrderPrice', () => {
    const orderPrice = 100;
    const state = { ...initialState, orders: [stockOrder] };
    const action = updateStockOrderOrderPrice(0, orderPrice);
    expect(ordersReducer(state, action)).toEqual({ ...state, orders: [{...stockOrder, orderPrice }] });
  })

  it('should handle updateStockOrderShareAmount', () => {
    const shareAmount = 100;
    const state = { ...initialState, orders: [stockOrder] };
    const action = updateStockOrderShareAmount(0, shareAmount);
    expect(ordersReducer(state, action)).toEqual({ ...state, orders: [{...stockOrder, shareAmount }] });
  })

  it('should handle placeStockOrder', () => {
    const s = { ...stockOrder, selected: true };
    const state = { ...initialState, orders: [s] };
    const action = placeStockOrder(stockOrder, token);
    expect(ordersReducer(state, action)).toEqual({ ...initialState, orders: [{ ...s, status: 'In Progress', selected: false }] });
  });

  it('should handle placeStockOrderSuccess', () => {
    const state = { ...initialState, orders: [stockOrder] };
    const orderPrice = 100;
    const action = placeStockOrderSuccess(orderId, orderPrice);
    expect(ordersReducer(state, action)).toEqual({ ...initialState, orders: [{ ...stockOrder, status: 'Booked', orderPrice }] });
  });

  it('should handle placeStockOrderError', () => {
    const state = { ...initialState, orders: [stockOrder] };
    const error = {
      type: 'testError',
      description: 'testError',
      code: 400
    } as ErrorResponse;
    const action = placeStockOrderError(orderId, error);
    expect(ordersReducer(state, action)).toEqual({ ...initialState, orders: [{ ...stockOrder, status: 'Rejected', error: `${error.type} - ${error.description}` }] });
  });

  it('should handle acknowledgeStockOrderError', () => {
    const state = { ...initialState, orders: [{ ...stockOrder, error: 'test', status: 'Rejected' as OrderStatus }] };
    const action = acknowledgeStockOrderError(0);
    expect(ordersReducer(state, action)).toEqual({ ...initialState, orders: [{ ...stockOrder, status: 'Rejected', error: null }] });
  });
});
