import React from 'react';
import { OrdersBasketHeader } from './components/header/OrdersBasketHeader';
import { OrdersBasketTable } from './components/table/OrdersBasketTable';
import { PageTitle } from '../../core/components/molecules/PageTitle';
import { FlexBox } from '../../core/components/atoms/FlexBox';
import { Text } from '../../core/components/atoms/Text';
import { StockOrder, OrderExecutionMode, OrderStatus } from '../../types/types';
import { ExecutionMode } from '../../core/lib/utils/executionMode';

interface OrdersBasketState {
  loading: boolean;
}

interface OrdersBasketProps {
  removeStockInOrderAction: () => void;
  selectStockInOrderAction: (orderId: string) => void;
  unselectStockInOrderAction: (orderId: string) => void;
  updateStockOrderExecutionModeAction: (
    stockIdx: number,
    executionMode: OrderExecutionMode
  ) => void;
  updateStockOrderOrderPriceAction: (
    stockIdx: number,
    orderPrice: number
  ) => void;
  updateStockOrderShareAmountAction: (
    stockIdx: number,
    shareAmount: number
  ) => void;
  updateStockOrderStatusAction: (stockIdx: number, status: OrderStatus) => void;
  placeStockOrderAction: (stockOrder: StockOrder, token: string) => void;
  acknowledgeStockOrderErrorAction: (stockIdx: number) => void;
  logOutAction: () => void;
  orders: StockOrder[];
  token: string;
  sessionTimeout: boolean;
}

export class OrdersBasket extends React.Component<
OrdersBasketProps,
OrdersBasketState
> {
  componentDidUpdate = () => {
    const { sessionTimeout, logOutAction } = this.props;
    if (sessionTimeout) {
      alert('Session Timeout - Please log in again!');
      logOutAction();
    }
  };

  onRemoveButtonClickHandler = () => {
    const { removeStockInOrderAction } = this.props;
    removeStockInOrderAction();
  };

  onBookButtonClickHandler = () => {
    const { orders, placeStockOrderAction, token } = this.props;
    const ordersToBePlaced = orders.filter(({ selected }) => selected);
    for (const order of ordersToBePlaced) {
      placeStockOrderAction(order, token);
    }
  };

  onSelectCheckClickHandler = (orderId: string, selected: boolean) => {
    const { selectStockInOrderAction, unselectStockInOrderAction } = this.props;
    if (selected) {
      unselectStockInOrderAction(orderId);
    } else {
      selectStockInOrderAction(orderId);
    }
  };

  onExecutionModeSelectHandler = (stockIdx: number, modeIdx: number) => {
    const { orders, updateStockOrderExecutionModeAction } = this.props;
    const {
      orderPrice,
      shareAmount,
      status,
      currency,
      bloombergTickerLocal,
    } = orders[stockIdx];
    const executionMode = ExecutionMode[modeIdx];
    updateStockOrderExecutionModeAction(stockIdx, executionMode);
    if (executionMode === 'Market') {
      const { updateStockOrderOrderPriceAction } = this.props;
      updateStockOrderOrderPriceAction(stockIdx, 0);
    }
    if (currency && bloombergTickerLocal) {
      this.checkOrderStatus(
        executionMode,
        shareAmount,
        orderPrice,
        status,
        stockIdx
      );
    }
  };

  onOrderPriceChangeHandler = (stockIdx: number, orderPrice: string) => {
    const { orders, updateStockOrderOrderPriceAction } = this.props;
    const {
      executionMode,
      shareAmount,
      status,
      currency,
      bloombergTickerLocal,
    } = orders[stockIdx];
    const converted = Number(orderPrice);
    updateStockOrderOrderPriceAction(stockIdx, converted);
    if (currency && bloombergTickerLocal) {
      this.checkOrderStatus(
        executionMode,
        shareAmount,
        converted,
        status,
        stockIdx
      );
    }
  };

  onShareAmountChangeHandler = (stockIdx: number, shareAmount: string) => {
    const { orders, updateStockOrderShareAmountAction } = this.props;
    const {
      executionMode,
      orderPrice,
      status,
      currency,
      bloombergTickerLocal,
    } = orders[stockIdx];
    const converted = Number(shareAmount);
    updateStockOrderShareAmountAction(stockIdx, converted);
    if (currency && bloombergTickerLocal) {
      this.checkOrderStatus(
        executionMode,
        converted,
        orderPrice,
        status,
        stockIdx
      );
    }
  };

  checkOrderStatus = (
    eM: OrderExecutionMode | undefined,
    sA: number | undefined,
    oP: number | undefined,
    s: OrderStatus,
    id: number
  ) => {
    const validSA = this.isValidShareAmount(sA);
    const validOP = this.isValidOrderPrice(oP);
    if (s === 'Not Ready') {
      if (
        (eM === 'Market' && validSA) ||
        (eM === 'Limit' && validSA && validOP)
      ) {
        this.updateOrderStatus(id, 'Ready');
      }
    }
    if (s === 'Ready') {
      if (!validSA || (eM === 'Limit' && !validOP)) {
        this.updateOrderStatus(id, 'Not Ready');
      }
    }
  };

  isValidShareAmount = (a: number | undefined) => a && a > 0;

  isValidOrderPrice = (p: number | undefined) => p && p > 0;

  updateOrderStatus = (idx: number, status: OrderStatus) => {
    const { updateStockOrderStatusAction } = this.props;
    updateStockOrderStatusAction(idx, status);
  };

  onCancelButtonClickHandler = (stockIdx: number) => {
    const { acknowledgeStockOrderErrorAction } = this.props;
    acknowledgeStockOrderErrorAction(stockIdx);
  };

  render() {
    const { orders } = this.props;
    const selectedOrders = orders.filter(({ selected }) => selected);
    const isSelectedOrdersEmpty = selectedOrders.length === 0;
    const isInvalidOrderExisted =
      selectedOrders.filter(
        ({ status }) =>
          status === 'Not Ready' || status === 'Booked' || status === 'Rejected'
      ).length > 0;
    return (
      <FlexBox>
        <PageTitle title="Orders Basket" />
        <OrdersBasketHeader
          onRemoveButtonClickHandler={this.onRemoveButtonClickHandler}
          onBookButtonClickHandler={this.onBookButtonClickHandler}
          removeButtonDisable={isSelectedOrdersEmpty}
          bookButtonDisable={isSelectedOrdersEmpty || isInvalidOrderExisted}
        />
        <FlexBox margin="2% 0%">
          {orders.length ? (
            <OrdersBasketTable
              orders={orders}
              onSelectCheckClickHandler={this.onSelectCheckClickHandler}
              onExecutionModeSelectHandler={this.onExecutionModeSelectHandler}
              onOrderPriceChangeHandler={this.onOrderPriceChangeHandler}
              onShareAmountChangeHandler={this.onShareAmountChangeHandler}
              onCancelButtonClickHandler={this.onCancelButtonClickHandler}
            />
          ) : (
            <Text>No Stock Order is selected in the basket</Text>
          )}
        </FlexBox>
      </FlexBox>
    );
  }
}
