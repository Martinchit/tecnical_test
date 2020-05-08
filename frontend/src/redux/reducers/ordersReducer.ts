import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions';
import { StockOrder } from '../../types/types';
import { updateObject } from '../../core/lib/utils/updateObject';

type Action = ActionType<typeof actions>;

export interface OrdersState {
  readonly orders: StockOrder[];
}

export const initialState: OrdersState = {
  orders: [],
};

export const ordersReducer = (
  state: OrdersState = initialState,
  action: Action
): OrdersState => {
  switch (action.type) {
    case getType(actions.addStockInOrder):
      return updateObject(state, { orders: state.orders.concat(action.payload) });
    case getType(actions.removeStockInOrder):
      return updateObject(state, {
        orders: state.orders.filter(({ selected }) => !selected),
      });
    case getType(actions.selectStockInOrder):
      return updateObject(state, {
        orders: state.orders.map((o) =>
          o['orderId'] === action.payload ? { ...o, selected: true } : o
        ),
      });
    case getType(actions.unselectStockInOrder):
      return updateObject(state, {
        orders: state.orders.map((o) =>
          o['orderId'] === action.payload ? { ...o, selected: false } : o
        ),
      });
    case getType(actions.updateStockOrderStatus):
      return updateObject(state, {
        orders: state.orders.map((o, i) =>
          i === action.payload.idx ? { ...o, status: action.payload.status } : o
        ),
      });
    case getType(actions.updateStockOrderExecutionMode):
      return updateObject(state, {
        orders: state.orders.map((o, i) =>
          i === action.payload.idx
            ? { ...o, executionMode: action.payload.executionMode }
            : o
        ),
      });
    case getType(actions.updateStockOrderOrderPrice):
      return updateObject(state, {
        orders: state.orders.map((o, i) =>
          i === action.payload.idx
            ? { ...o, orderPrice: action.payload.orderPrice }
            : o
        ),
      });
    case getType(actions.updateStockOrderShareAmount):
      return updateObject(state, {
        orders: state.orders.map((o, i) =>
          i === action.payload.idx
            ? { ...o, shareAmount: action.payload.shareAmount }
            : o
        ),
      });
    case getType(actions.placeStockOrder):
      return updateObject(state, {
        orders: state.orders.map((o) =>
          o['selected']
            ? {
                ...o,
                status: 'In Progress',
                selected: false,
              }
            : o
        ),
      });
    case getType(actions.placeStockOrderSuccess):
      return updateObject(state, {
        orders: state.orders.map((o) =>
          o['orderId'] === action.payload.orderId
            ? { ...o, status: 'Booked', orderPrice: action.payload.orderPrice }
            : o
        ),
      });
    case getType(actions.placeStockOrderError):
      return updateObject(state, {
        orders: state.orders.map((o) =>
          o['orderId'] === action.payload.orderId
            ? {
                ...o,
                status: 'Rejected',
                error: `${action.payload.error.type} - ${action.payload.error.description}`,
              }
            : o
        ),
      });
    case getType(actions.acknowledgeStockOrderError):
      return updateObject(state, {
        orders: state.orders.map((o, i) =>
          i === action.payload ? { ...o, error: null } : o
        ),
      });
    default:
      return state;
  }
};
