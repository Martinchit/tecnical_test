import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionsType, RootStateType, actions } from '../../redux/store';
import { OrdersBasket } from './OrdersBasket';
import { OrderExecutionMode, OrderStatus, StockOrder } from '../../types/types';

interface OwnProps {}

const mapStateToProps = (state: RootStateType) => ({
  orders: state.orders.orders,
  token: state.auth.token,
  sessionTimeout: state.auth.sessionTimeout,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ActionsType>,
  props: OwnProps
) => ({
  removeStockInOrderAction: () => dispatch(actions.removeStockInOrder()),
  selectStockInOrderAction: (orderId: string) =>
    dispatch(actions.selectStockInOrder(orderId)),
  unselectStockInOrderAction: (orderId: string) =>
    dispatch(actions.unselectStockInOrder(orderId)),
  updateStockOrderExecutionModeAction: (
    stockIdx: number,
    executionMode: OrderExecutionMode
  ) => dispatch(actions.updateStockOrderExecutionMode(stockIdx, executionMode)),
  updateStockOrderOrderPriceAction: (stockIdx: number, orderPrice: number) =>
    dispatch(actions.updateStockOrderOrderPrice(stockIdx, orderPrice)),
  updateStockOrderShareAmountAction: (stockIdx: number, shareAmount: number) =>
    dispatch(actions.updateStockOrderShareAmount(stockIdx, shareAmount)),
  updateStockOrderStatusAction: (stockIdx: number, status: OrderStatus) =>
    dispatch(actions.updateStockOrderStatus(stockIdx, status)),
  placeStockOrderAction: (stockOrder: StockOrder, token: string) =>
    dispatch(actions.placeStockOrder(stockOrder, token)),
  acknowledgeStockOrderErrorAction: (stockIdx) =>
    dispatch(actions.acknowledgeStockOrderError(stockIdx)),
  logOutAction: () => dispatch(actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersBasket);
