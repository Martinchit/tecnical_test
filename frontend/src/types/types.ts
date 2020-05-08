export interface Stock {
  id: number;
  stockId: string;
  currency: string;
  ric: string;
  bloombergTicker: string;
  bloombergTickerLocal: string;
  name: string;
  country: string;
  price: number;
}

export type OrderSide = 'Buy' | 'Sell';
export type Currency = 'HKD' | 'USD' | 'AUD' | 'EUR' | 'SGD';
export type OrderStatus =
  | 'Not Ready'
  | 'Ready'
  | 'In Progress'
  | 'Booked'
  | 'Rejected';
export type OrderExecutionMode = 'Market' | 'Limit';

export interface StockOrder {
  id: number;
  stockId: string;
  currency: string;
  bloombergTickerLocal: string;
  side: OrderSide;
  status: OrderStatus;
  executionMode?: OrderExecutionMode;
  orderPrice?: number;
  shareAmount?: number;
  error?: string;
  selected: boolean;
  orderId: string;
}

export interface StockListAlert {
  [x: number]: OrderSide;
}

export interface ErrorResponse {
  type: string;
  description: string;
  code: number;
}

export interface SelectedId {
  id: number;
  side: string;
}

export type AuthMode = 'Log In' | 'Sign Up';
